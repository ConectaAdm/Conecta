const SUPABASE_URL = 'https://ogpylujeroumxxhnpzwo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xN98jCv8nuTgBJoJN5wZXQ_3kb1F_MM';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let usuarioAtual = null;

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = '/login';
        return;
    }
    usuarioAtual = session.user;

    atualizarDadosNaTela();
    carregarTagsSalvas();
});

function atualizarDadosNaTela() {
    const nome = usuarioAtual.user_metadata?.full_name || usuarioAtual.email.split('@')[0];
    const curso = usuarioAtual.user_metadata?.course || 'Eng. Software • 4º P.';
    const iniciais = nome.substring(0, 2).toUpperCase();

    document.getElementById('userAvatarInitials').textContent = iniciais;
    document.getElementById('headerUserName').textContent = nome;
    document.getElementById('headerUserCourse').textContent = curso;

    document.getElementById('cardAvatarInitials').textContent = iniciais;
    document.getElementById('cardUserName').textContent = nome;
    document.getElementById('cardUserCourse').textContent = curso;
}

// Carregar tags salvas do usuário (salvas no user_metadata do Supabase)
function carregarTagsSalvas() {
    const container = document.getElementById('tagsContainer');
    container.innerHTML = '';

    const tagsSalvas = usuarioAtual.user_metadata?.tags || ['POO', 'Back-end', 'Estrutura de Dados'];
    
    tagsSalvas.forEach(tagTexto => {
        criarElementoTag(tagTexto);
    });
}

function criarElementoTag(texto) {
    const container = document.getElementById('tagsContainer');
    const span = document.createElement('span');
    span.className = 'tag-item';
    span.innerHTML = `${escapeHtml(texto)} <span class="remove-tag" onclick="removerTagEAtualizar(this)">✕</span>`;
    container.appendChild(span);
}

async function adicionarTagAoBanco() {
    const input = document.getElementById('tagInput');
    const valor = input.value.trim();
    if (!valor) return;

    // Pega as tags atuais visíveis na tela
    const tagsAtuais = Array.from(document.querySelectorAll('#tagsContainer .tag-item'))
        .map(el => el.childNodes[0].nodeValue.trim());

    if (tagsAtuais.includes(valor)) {
        input.value = '';
        return;
    }

    tagsAtuais.push(valor);

    // Salva no Supabase Auth (user_metadata)
    const { data, error } = await supabaseClient.auth.updateUser({
        data: { ...usuarioAtual.user_metadata, tags: tagsAtuais }
    });

    if (!error) {
        usuarioAtual = data.user;
        carregarTagsSalvas();
        input.value = '';
    } else {
        alert('Erro ao salvar tag.');
    }
}

async function removerTagEAtualizar(element) {
    const tagItem = element.parentElement;
    tagItem.remove();

    // Atualiza a lista restante no Supabase
    const tagsAtuais = Array.from(document.querySelectorAll('#tagsContainer .tag-item'))
        .map(el => el.childNodes[0].nodeValue.trim());

    await supabaseClient.auth.updateUser({
        data: { ...usuarioAtual.user_metadata, tags: tagsAtuais }
    });
}

function addTagFromInput() {
    adicionarTagAoBanco();
}

function handleTagKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        adicionarTagAoBanco();
    }
}

// Funções do Modal e Perfil
function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function openProfileModal() {
    document.getElementById('profileModal').style.display = 'flex';
    document.getElementById('profileMenu').style.display = 'none';

    document.getElementById('inputName').value = usuarioAtual.user_metadata?.full_name || '';
    document.getElementById('inputCourse').value = usuarioAtual.user_metadata?.course || '';
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

async function saveProfile() {
    const novoNome = document.getElementById('inputName').value.trim();
    const novoCurso = document.getElementById('inputCourse').value.trim();

    if (!novoNome) {
        alert('O nome não pode estar vazio.');
        return;
    }

    const { data, error } = await supabaseClient.auth.updateUser({
        data: { ...usuarioAtual.user_metadata, full_name: novoNome, course: novoCurso }
    });

    if (error) {
        alert('Erro ao salvar os dados.');
    } else {
        alert('Perfil atualizado com sucesso!');
        usuarioAtual = data.user;
        atualizarDadosNaTela();
        closeProfileModal();
    }
}

window.fazerLogout = async function() {
    await supabaseClient.auth.signOut();
    window.location.href = '/login';
};

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}