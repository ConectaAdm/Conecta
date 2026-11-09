if (typeof window.supabaseClient === 'undefined') {
  const SUPABASE_URL = 'https://ogpylujeroumxxhnpzwo.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_xN98jCv8nuTgBJoJN5wZXQ_3kb1F_MM';
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

var supabase = window.supabaseClient;
let usuarioAtual = null;

window.toggleProfileMenu = function() {
  const profileMenu = document.getElementById('profileMenu');
  if (profileMenu) {
    profileMenu.classList.toggle('show');
  }
};

window.fazerLogout = async function() {
  await supabase.auth.signOut();
  window.location.href = '/login';
};

window.openProfileModal = function() {
  const modal = document.getElementById('profileModal');
  const menu = document.getElementById('profileMenu');
  if (menu) menu.classList.remove('show');
  if (modal) modal.style.display = 'flex';

  const nameElement = document.getElementById('headerUserName');
  const courseElement = document.getElementById('headerUserCourse');
  
  const inputName = document.getElementById('inputName');
  const inputCourse = document.getElementById('inputCourse');

  if (inputName && nameElement) inputName.value = nameElement.innerText;
  if (inputCourse && courseElement) inputCourse.value = courseElement.innerText;
};

window.closeProfileModal = function() {
  const modal = document.getElementById('profileModal');
  if (modal) modal.style.display = 'none';
};

window.saveProfile = async function() {
  const novoNome = document.getElementById('inputName')?.value.trim();
  const novaInstituicao = document.getElementById('inputCourse')?.value.trim();

  if (!novoNome) {
    alert('O nome não pode estar vazio.');
    return;
  }

  try {
    // 1. Atualiza no Supabase Auth (metadados)
    const { data, error: authError } = await supabase.auth.updateUser({
      data: { nome: novoNome, instituicao: novaInstituicao, full_name: novoNome }
    });

    if (authError) throw authError;

    // 2. Atualiza na tabela 'alunos' para manter sincronizado
    if (usuarioAtual) {
      await supabase
        .from('alunos')
        .update({ nome: novoNome, instituicao: novaInstituicao })
        .eq('id', usuarioAtual.id);
    }

    alert('Perfil atualizado com sucesso!');
    window.closeProfileModal();
    await carregarDadosUsuario(); // Recarrega os dados imediatamente na tela

  } catch (err) {
    alert('Erro ao salvar perfil: ' + err.message);
    console.error(err);
  }
};

window.switchTab = function(tabId) {
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.classList.remove('active'));

  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));

  const activeTab = document.getElementById(tabId);
  if (activeTab) activeTab.classList.add('active');

  const activeButton = Array.from(tabButtons).find(btn => 
    btn.getAttribute('onclick')?.includes(`'${tabId}'`)
  );
  if (activeButton) activeButton.classList.add('active');
};

document.addEventListener('DOMContentLoaded', async () => {
  await carregarDadosUsuario();

  window.addEventListener('click', (event) => {
    const profileContainer = document.querySelector('.user-profile-container');
    const profileMenu = document.getElementById('profileMenu');
    
    if (profileMenu && profileContainer && !profileContainer.contains(event.target)) {
      profileMenu.classList.remove('show');
    }
  });
});

async function carregarDadosUsuario() {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      window.location.href = '/login';
      return;
    }

    usuarioAtual = user;

    // Tenta buscar da tabela alunos
    const { data: aluno } = await supabase
      .from('alunos')
      .select('nome, instituicao')
      .eq('id', user.id)
      .maybeSingle();

    // ORDEM DE PRIORIDADE CORRIGIDA: 
    // 1º user_metadata (o que foi alterado recentemente por último)
    // 2º tabela alunos 
    // 3º email
    const nomeCompleto = user.user_metadata?.nome || user.user_metadata?.full_name || aluno?.nome || user.email.split('@')[0];
    const instituicao = user.user_metadata?.instituicao || aluno?.instituicao || 'Estudante';

    const nameElement = document.getElementById('headerUserName');
    const courseElement = document.getElementById('headerUserCourse');
    const avatarElement = document.getElementById('userAvatarInitials');

    if (nameElement) nameElement.innerText = nomeCompleto;
    if (courseElement) courseElement.innerText = instituicao;

    if (avatarElement) {
      const partesNome = nomeCompleto.trim().split(' ');
      let iniciais = partesNome[0].charAt(0).toUpperCase();
      if (partesNome.length > 1) {
        iniciais += partesNome[partesNome.length - 1].charAt(0).toUpperCase();
      }
      avatarElement.innerText = iniciais;
    }

  } catch (err) {
    console.error('Erro ao carregar os dados do perfil:', err);
  }
}