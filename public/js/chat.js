const SUPABASE_URL = 'https://ogpylujeroumxxhnpzwo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xN98jCv8nuTgBJoJN5wZXQ_3kb1F_MM';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let salaAtualId = null;
let usuarioAtual = null;
let arquivoSelecionado = null;

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = '/login';
        return;
    }
    usuarioAtual = session.user;

    await carregarPerfilHeader();
    await carregarSalas();

    // Capturar o input de arquivo quando selecionado
    const inputFile = document.getElementById('file-upload');
    if (inputFile) {
        inputFile.addEventListener('change', (e) => {
            arquivoSelecionado = e.target.files[0];
            if (arquivoSelecionado) {
                const textInput = document.querySelector('.chat-input-area input[type="text"]');
                if (textInput) {
                    textInput.placeholder = `Arquivo anexado: ${arquivoSelecionado.name}`;
                }
            }
        });
    }

    // Evento do formulário de envio de mensagens e arquivos
    const chatForm = document.querySelector('.chat-input-area');
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = chatForm.querySelector('input[type="text"]');
        const conteudo = input.value.trim();

        if ((!conteudo && !arquivoSelecionado) || !salaAtualId) return;

        const eMembro = await verificarSeEMembro(salaAtualId, usuarioAtual.id);
        if (!eMembro) {
            alert('Você precisa entrar na sala antes de enviar mensagens ou materiais.');
            return;
        }

        const nomeUsuario = usuarioAtual.user_metadata?.nome || usuarioAtual.user_metadata?.full_name || usuarioAtual.email.split('@')[0];
        
        let arquivoUrl = null;
        let arquivoNome = null;

        // Se houver arquivo selecionado, faz o upload para o Supabase Storage
        if (arquivoSelecionado) {
            const fileExt = arquivoSelecionado.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
            const filePath = `${salaAtualId}/${fileName}`;

            const { data: uploadData, error: uploadError } = await supabaseClient.storage
                .from('materiais-chat')
                .upload(filePath, arquivoSelecionado);

            if (uploadError) {
                console.error('Erro ao enviar arquivo:', uploadError);
                alert('Erro ao enviar o arquivo. Verifique se o bucket "materiais-chat" existe no Supabase Storage.');
                return;
            }

            // Obter a URL pública do ficheiro
            const { data: publicUrlData } = supabaseClient.storage
                .from('materiais-chat')
                .getPublicUrl(filePath);

            arquivoUrl = publicUrlData.publicUrl;
            arquivoNome = arquivoSelecionado.name;
        }

        // Inserir a mensagem/material na tabela de mensagens
        const { error: err } = await supabaseClient.from('mensagens').insert([
            {
                sala_id: salaAtualId,
                user_id: usuarioAtual.id,
                user_nome: nomeUsuario,
                conteudo: conteudo || `Enviou um arquivo: ${arquivoNome}`,
                arquivo_url: arquivoUrl,
                arquivo_nome: arquivoNome
            }
        ]);

        if (err) {
            console.error('Erro ao enviar mensagem:', err);
            alert('Erro ao enviar mensagem.');
        } else {
            input.value = '';
            input.placeholder = 'Escreva sua dúvida ou mensagem...';
            arquivoSelecionado = null;
            if (inputFile) inputFile.value = '';
            
            await carregarMateriaisCompartilhados(salaAtualId);
        }
    });

    const btnCriarSala = document.querySelector('.sidebar-header .btn');
    if (btnCriarSala) {
        btnCriarSala.addEventListener('click', () => {
            document.getElementById('criarSalaModal').style.display = 'flex';
        });
    }
});

async function carregarPerfilHeader() {
    const avatarEl = document.getElementById('userAvatarInitials');
    const nameEl = document.getElementById('headerUserName');
    const courseEl = document.getElementById('headerUserCourse');

    const { data: aluno } = await supabaseClient
        .from('alunos')
        .select('nome, instituicao')
        .eq('id', usuarioAtual.id)
        .maybeSingle();

    const nome = usuarioAtual.user_metadata?.nome || usuarioAtual.user_metadata?.full_name || aluno?.nome || usuarioAtual.email.split('@')[0];
    const curso = usuarioAtual.user_metadata?.instituicao || aluno?.instituicao || 'Estudante';
    const iniciais = nome.substring(0, 2).toUpperCase();

    nameEl.textContent = nome;
    courseEl.textContent = curso;
    avatarEl.textContent = iniciais;
}

async function carregarSalas() {
    const { data: salas, error } = await supabaseClient.from('salas').select('*').order('created_at', { ascending: false });
    
    if (error) {
        console.error('Erro ao carregar salas:', error);
        return;
    }

    const chatListContainer = document.querySelector('.chat-list');
    chatListContainer.innerHTML = '';

    if (salas && salas.length > 0) {
        salas.forEach((sala, index) => {
            const item = document.createElement('div');
            item.className = `chat-item ${index === 0 ? 'active' : ''}`;
            item.innerHTML = `
                <div class="chat-item-icon">💻</div>
                <div class="chat-item-info">
                    <h4>${escapeHtml(sala.nome)}</h4>
                    <p>${escapeHtml(sala.topico || 'Sala de estudos')}</p>
                </div>
            `;
            item.addEventListener('click', () => {
                document.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                mudarSala(sala);
            });
            chatListContainer.appendChild(item);
        });

        mudarSala(salas[0]);
    } else {
        chatListContainer.innerHTML = '<p style="padding: 1rem; font-size: 0.85rem; color: #64748b;">Nenhuma sala criada.</p>';
    }
}

function fecharModalSala() {
    document.getElementById('criarSalaModal').style.display = 'none';
    document.getElementById('inputNomeSala').value = '';
    document.getElementById('inputTopicoSala').value = '';
}

async function salvarNovaSala() {
    const nome = document.getElementById('inputNomeSala').value.trim();
    const topico = document.getElementById('inputTopicoSala').value.trim();

    if (!nome) {
        alert('Digite o nome da sala.');
        return;
    }

    const { data, error } = await supabaseClient.from('salas').insert([
        { nome: nome, topico: topico || 'Estudos gerais' }
    ]).select();

    if (error) {
        console.error('Erro ao criar sala:', error);
        alert('Erro ao criar sala.');
    } else {
        fecharModalSala();
        carregarSalas();
    }
}

async function verificarSeEMembro(salaId, userId) {
    const { data } = await supabaseClient
        .from('sala_membros')
        .select('*')
        .eq('sala_id', salaId)
        .eq('user_id', userId)
        .maybeSingle();
    return !!data;
}

async function mudarSala(sala) {
    salaAtualId = sala.id;
    
    const chatHeaderTitle = document.querySelector('.chat-main .chat-header h2');
    const chatHeaderBadge = document.querySelector('.chat-main .chat-header .badge-topic');
    if (chatHeaderTitle) chatHeaderTitle.textContent = sala.nome;
    if (chatHeaderBadge) chatHeaderBadge.textContent = sala.topico || '';

    const eMembro = await verificarSeEMembro(sala.id, usuarioAtual.id);

    if (!eMembro) {
        const container = document.querySelector('.messages-container');
        container.innerHTML = `
            <div class="system-message" style="display: flex; flex-direction: column; gap: 0.8rem; align-items: center; padding: 2rem;">
                <span>🔒 Você precisa entrar na sala <strong>"${escapeHtml(sala.nome)}"</strong> para ver as mensagens e materiais.</span>
                <button class="btn btn-primary btn-sm" onclick="entrarNaSalaAtual('${sala.id}', '${escapeHtml(sala.nome)}')">🚀 Entrar na Sala</button>
            </div>
        `;
        
        document.querySelector('.chat-details .user-list').innerHTML = '<li>🔒 Restrito a membros</li>';
        document.querySelector('.chat-details .shared-materials').innerHTML = '<p style="font-size: 0.8rem; color: #64748b; padding: 0.5rem;">Conteúdo restrito.</p>';
        return;
    }

    await carregarMensagens(sala.id);
    await carregarParticipantes(sala.id);
    await carregarMateriaisCompartilhados(sala.id);
    escutarTempoReal(sala.id);
}

window.entrarNaSalaAtual = async function(salaId, nomeSala) {
    const { data: aluno } = await supabaseClient
        .from('alunos')
        .select('nome')
        .eq('id', usuarioAtual.id)
        .maybeSingle();

    const nomeUsuario = usuarioAtual.user_metadata?.nome || usuarioAtual.user_metadata?.full_name || aluno?.nome || usuarioAtual.email.split('@')[0];

    const { error } = await supabaseClient.from('sala_membros').insert([
        { sala_id: salaId, user_id: usuarioAtual.id, user_nome: nomeUsuario }
    ]);

    if (error) {
        console.error('Erro ao entrar na sala:', error);
        alert('Erro ao entrar na sala.');
    } else {
        alert(`Você entrou na sala "${nomeSala}" com sucesso!`);
        const salaObj = { id: salaId, nome: nomeSala };
        mudarSala(salaObj);
    }
};

window.sairDaSalaAtual = async function() {
    if (!salaAtualId) {
        alert('Nenhuma sala selecionada.');
        return;
    }

    const confirmar = confirm('Tem certeza que deseja sair desta sala de estudos?');
    if (!confirmar) return;

    const { error } = await supabaseClient
        .from('sala_membros')
        .delete()
        .eq('sala_id', salaAtualId)
        .eq('user_id', usuarioAtual.id);

    if (error) {
        console.error('Erro ao sair da sala:', error);
        alert('Erro ao sair da sala.');
    } else {
        alert('Você saiu da sala com sucesso.');
        window.location.reload();
    }
};

window.fazerLogout = async function() {
    await supabaseClient.auth.signOut();
    window.location.href = '/login';
};

async function carregarParticipantes(salaId) {
    const { data: membros, error } = await supabaseClient
        .from('sala_membros')
        .select('*')
        .eq('sala_id', salaId);

    const tituloParticipantes = document.querySelector('.chat-details .details-section h3');
    const listaParticipantes = document.querySelector('.chat-details .user-list');

    if (error || !membros) return;

    if (tituloParticipantes) {
        tituloParticipantes.textContent = `Participantes (${membros.length})`;
    }

    if (listaParticipantes) {
        listaParticipantes.innerHTML = '';
        membros.forEach(membro => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="status-dot online"></span> ${escapeHtml(membro.user_nome)}`;
            listaParticipantes.appendChild(li);
        });
    }
}

async function carregarMateriaisCompartilhados(salaId) {
    const containerMateriais = document.querySelector('.chat-details .shared-materials');
    if (!containerMateriais) return;

    const { data: mensagens, error } = await supabaseClient
        .from('mensagens')
        .select('*')
        .eq('sala_id', salaId)
        .not('arquivo_url', 'is', null)
        .order('created_at', { ascending: false });

    if (error || !mensagens || mensagens.length === 0) {
        containerMateriais.innerHTML = '<p style="font-size: 0.8rem; color: #64748b; padding: 0.5rem;">Nenhum material na sala.</p>';
        return;
    }

    containerMateriais.innerHTML = '';
    mensagens.forEach(msg => {
        const div = document.createElement('div');
        div.style.cssText = 'padding: 0.4rem 0; border-bottom: 1px solid #f1f5f9; font-size: 0.85rem;';
        div.innerHTML = `
            <a href="${msg.arquivo_url}" target="_blank" style="color: #4f46e5; text-decoration: none; font-weight: 500; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(msg.arquivo_nome)}">
                📄 ${escapeHtml(msg.arquivo_nome)}
            </a>
            <span style="font-size: 0.75rem; color: #94a3b8;">Por: ${escapeHtml(msg.user_nome)}</span>
        `;
        containerMateriais.appendChild(div);
    });
}

async function carregarMensagens(salaId) {
    const container = document.querySelector('.messages-container');
    container.innerHTML = `
        <div class="system-message">
            <span>Carregando mensagens...</span>
        </div>
    `;

    const { data: mensagens, error } = await supabaseClient
        .from('mensagens')
        .select('*')
        .eq('sala_id', salaId)
        .order('created_at', { ascending: true });

    container.innerHTML = `
        <div class="system-message">
            <span>Você entrou na sala de estudos</span>
        </div>
    `;

    if (error) return;

    if (mensagens && mensagens.length > 0) {
        mensagens.forEach(msg => renderizarMensagem(msg));
    }
    container.scrollTop = container.scrollHeight;
}

let canalAtual = null;
function escutarTempoReal(salaId) {
    if (canalAtual) {
        supabaseClient.removeChannel(canalAtual);
    }

    canalAtual = supabaseClient
        .channel(`room:${salaId}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensagens', filter: `sala_id=eq.${salaId}` }, payload => {
            renderizarMensagem(payload.new);
            carregarMateriaisCompartilhados(salaId);
            const container = document.querySelector('.messages-container');
            container.scrollTop = container.scrollHeight;
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'sala_membros', filter: `sala_id=eq.${salaId}` }, () => {
            carregarParticipantes(salaId);
        })
        .subscribe();
}

function renderizarMensagem(msg) {
    const container = document.querySelector('.messages-container');
    const isOwn = msg.user_id === usuarioAtual.id;
    const hora = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const iniciais = msg.user_nome ? msg.user_nome.substring(0, 2).toUpperCase() : 'US';

    const div = document.createElement('div');
    div.className = `message ${isOwn ? 'message-own' : ''}`;

    let anexoHtml = '';
    if (msg.arquivo_url) {
        anexoHtml = `
            <div style="margin-top: 0.4rem; background: rgba(0,0,0,0.04); padding: 0.5rem; border-radius: 6px;">
                <a href="${msg.arquivo_url}" target="_blank" style="color: inherit; font-weight: 600; text-decoration: underline; font-size: 0.85rem;">
                    📎 Baixar/Ver: ${escapeHtml(msg.arquivo_nome)}
                </a>
            </div>
        `;
    }

    if (isOwn) {
        div.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <time>${hora}</time>
                    <span class="user-name">Você</span>
                </div>
                <p>${escapeHtml(msg.conteudo)}</p>
                ${anexoHtml}
            </div>
        `;
    } else {
        div.innerHTML = `
            <div class="avatar">${iniciais}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="user-name">${escapeHtml(msg.user_nome)}</span>
                    <time>${hora}</time>
                </div>
                <p>${escapeHtml(msg.conteudo)}</p>
                ${anexoHtml}
            </div>
        `;
    }

    container.appendChild(div);
}

function escapeHtml(text) {
    if (!text) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function toggleProfileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu) {
        profileMenu.classList.toggle('show');
    }
}