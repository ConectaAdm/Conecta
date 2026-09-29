
if (typeof window.supabaseClient === 'undefined') {
  const SUPABASE_URL = 'https://ogpylujeroumxxhnpzwo.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_xN98jCv8nuTgBJoJN5wZXQ_3kb1F_MM';
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

var supabase = window.supabaseClient;

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
};

window.closeProfileModal = function() {
  const modal = document.getElementById('profileModal');
  if (modal) modal.style.display = 'none';
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

    const { data: aluno } = await supabase
      .from('alunos')
      .select('nome, instituicao')
      .eq('id', user.id)
      .single();

    const nomeCompleto = aluno?.nome || user.user_metadata?.nome || 'Usuário';
    const instituicao = aluno?.instituicao || user.user_metadata?.instituicao || 'Estudante';

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

window.irParaChat = function() {
  window.location.href = 'chat.html';
};