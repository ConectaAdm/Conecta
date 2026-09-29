<<<<<<< HEAD

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
=======
// Troca de Abas
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Menu de Perfil Dropdown
function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.classList.toggle('show');
}

// Abrir/Fechar Modal de Perfil
function openProfileModal() {
    document.getElementById('profileModal').classList.add('active');
    toggleProfileMenu();
}
function closeProfileModal() {
    document.getElementById('profileModal').classList.remove('active');
}

// Salvar Perfil Alterado
function saveProfile() {
    const newName = document.getElementById('inputName').value;
    const newCourse = document.getElementById('inputCourse').value;

    if (newName.trim() !== '') {
        document.getElementById('headerUserName').innerText = newName;
        const initials = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        document.getElementById('userAvatarInitials').innerText = initials;
    }

    if (newCourse.trim() !== '') {
        document.getElementById('headerUserCourse').innerText = newCourse;
    }

    closeProfileModal();
}

// Abrir/Fechar Modal de Salas
function openRoomModal() {
    document.getElementById('roomModal').classList.add('active');
}

function closeRoomModal() {
    document.getElementById('roomModal').classList.remove('active');
}

// Criar Nova Sala Dinâmica
function createNewRoom() {
    const subject = document.getElementById('inputSubject').value;
    const title = document.getElementById('inputRoomTitle').value;

    if (!subject || !title) {
        alert('Por favor, preencha a matéria e o título da sala.');
        return;
    }

    const roomsList = document.getElementById('roomsList');
    
    const newRoomItem = document.createElement('div');
    newRoomItem.className = 'room-item';
    newRoomItem.innerHTML = `
        <div class="item-info">
            <h4>[${subject}] ${title}</h4>
            <p>Matéria: ${subject} • 1 participante online (Você)</p>
        </div>
        <button class="btn-primary" onclick="alert('Entrando na sala virtual...')">Entrar na Sala</button>
    `;

    roomsList.prepend(newRoomItem);
    
    document.getElementById('inputSubject').value = '';
    document.getElementById('inputRoomTitle').value = '';
    closeRoomModal();
}

// Logout
function fazerLogout() {
    alert('Você saiu da conta com sucesso!');
}

// Fechar menus se clicar fora
window.onclick = function(event) {
    if (!event.target.closest('.user-profile-container')) {
        const menu = document.getElementById('profileMenu');
        if (menu && menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    }
>>>>>>> 5697313bab8c51a5908d96a4b26cd0ffe0d1c8e5
};