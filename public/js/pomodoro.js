// Usa a mesma instância global do Supabase do seu projeto
if (typeof window.supabaseClient === 'undefined') {
  const SUPABASE_URL = 'https://ogpylujeroumxxhnpzwo.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_xN98jCv8nuTgBJoJN5wZXQ_3kb1F_MM';
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

var supabase = window.supabaseClient;
let usuarioAtual = null;

let timer = null;
let timeLeft = 25 * 60;
let isRunning = false;
let currentMode = 'foco';
let completedCycles = 0;
let currentAudio = null;

// Inicialização da página
document.addEventListener('DOMContentLoaded', async () => {
  await carregarDadosUsuario();
  updateDisplay();
  setupEventListeners();

  // Fecha o menu de perfil ao clicar fora
  window.addEventListener('click', (event) => {
    const profileContainer = document.querySelector('.user-profile-container');
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu && profileContainer && !profileContainer.contains(event.target)) {
      profileMenu.classList.remove('show');
    }
  });
});

// Funções globais de navegação e perfil (mesmo padrão do seu exemplo)
window.toggleProfileMenu = function() {
  const profileMenu = document.getElementById('profileMenu');
  if (profileMenu) {
    profileMenu.classList.toggle('show');
  }
};

window.fazerLogout = async function() {
  await supabase.auth.signOut();
  window.location.href = '../index.html'; // Ajuste conforme sua rota de login
};

// Carregar dados do usuário logado (Perfil e Nome)
async function carregarDadosUsuario() {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      window.location.href = '../index.html';
      return;
    }

    usuarioAtual = user;

    // Busca na tabela 'alunos' (igual ao seu exemplo)
    const { data: aluno } = await supabase
      .from('alunos')
      .select('nome, instituicao')
      .eq('id', user.id)
      .maybeSingle();

    const nomeCompleto = user.user_metadata?.nome || user.user_metadata?.full_name || aluno?.nome || user.email.split('@')[0];
    const instituicao = user.user_metadata?.instituicao || aluno?.instituicao || 'Eng. Software';

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

    // Carrega as tarefas do Pomodoro específicas deste usuário
    await loadTasksFromDB();

  } catch (err) {
    console.error('Erro ao carregar os dados do perfil:', err);
  }
}

// --- LÓGICA DO POMODORO E TAREFAS ---

function setupEventListeners() {
  document.getElementById('start-btn').addEventListener('click', toggleTimer);
  document.getElementById('reset-btn').addEventListener('click', resetTimer);

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      setMode(btn.getAttribute('data-mode'), parseInt(btn.getAttribute('data-time')), e);
    });
  });

  document.querySelectorAll('.sound-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      setSound(btn.getAttribute('data-sound'), e);
    });
  });

  const todoForm = document.getElementById('todo-form');
  if (todoForm) {
    todoForm.addEventListener('submit', addTask);
  }
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerText = document.getElementById('timer-text');
  if (timerText) {
    timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

function toggleTimer() {
  const startBtn = document.getElementById('start-btn');
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    if (startBtn) startBtn.textContent = 'Continuar';
  } else {
    isRunning = true;
    if (startBtn) startBtn.textContent = 'Pausar';
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        if (startBtn) startBtn.textContent = 'Iniciar';
        
        if (currentMode === 'foco') {
          completedCycles++;
          updateCyclesUI();
          alert('Parabéns! Sessão de foco concluída.');
        } else {
          alert('Pausa encerrada! Hora de voltar ao foco.');
        }
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  if (currentMode === 'foco') timeLeft = 25 * 60;
  if (currentMode === 'pausa-curta') timeLeft = 5 * 60;
  if (currentMode === 'pausa-longa') timeLeft = 15 * 60;
  updateDisplay();
  const startBtn = document.getElementById('start-btn');
  if (startBtn) startBtn.textContent = 'Iniciar';
}

function setMode(mode, minutes, event) {
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.currentTarget) event.currentTarget.classList.add('active');

  currentMode = mode;
  const statusText = document.getElementById('timer-status');
  if (statusText) {
    if (mode === 'foco') statusText.textContent = 'Hora de se concentrar!';
    if (mode === 'pausa-curta') statusText.textContent = 'Pausa rápida! Respire um pouco.';
    if (mode === 'pausa-longa') statusText.textContent = 'Pausa longa! Aproveite para relaxar.';
  }

  clearInterval(timer);
  isRunning = false;
  timeLeft = minutes * 60;
  updateDisplay();
  const startBtn = document.getElementById('start-btn');
  if (startBtn) startBtn.textContent = 'Iniciar';
}

function updateCyclesUI() {
  const dots = document.querySelectorAll('.cycle-dots .dot');
  dots.forEach((dot, index) => {
    if (index < (completedCycles % 4)) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function setSound(tipo, event) {
  document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.currentTarget) event.currentTarget.classList.add('active');

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  const soundUrls = {
    chuva: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_429a3b66d4.mp3?filename=light-rain-loop-22933.mp3',
    lofi: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf7f6.mp3?filename=lofi-study-112191.mp3',
    ondas: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ocean-waves-112906.mp3'
  };

  if (soundUrls[tipo]) {
    currentAudio = new Audio(soundUrls[tipo]);
    currentAudio.loop = true;
    currentAudio.volume = 0.4;
    currentAudio.play().catch(e => console.log("Áudio bloqueado pelo navegador até interação"));
  }
}

// --- PERSISTÊNCIA DAS TAREFAS NO BANCO DE DADOS ---

async function loadTasksFromDB() {
  if (!usuarioAtual) return;

  const { data: tasks, error } = await supabase
    .from('pomodoro_tasks')
    .select('*')
    .eq('user_id', usuarioAtual.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Erro ao buscar tarefas do pomodoro:', error.message);
    return;
  }

  const ul = document.getElementById('todo-list');
  if (!ul) return;
  ul.innerHTML = '';
  
  if (tasks) {
    tasks.forEach(task => renderTaskItem(task.id, task.title, task.completed));
  }
}

async function addTask(e) {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  if (!input) return;
  const title = input.value.trim();
  if (!title || !usuarioAtual) return;

  const { data, error } = await supabase
    .from('pomodoro_tasks')
    .insert([{ user_id: usuarioAtual.id, title: title, completed: false }])
    .select()
    .single();

  if (error) {
    console.error('Erro ao salvar tarefa:', error.message);
    alert('Erro ao salvar tarefa: ' + error.message);
    return;
  }

  renderTaskItem(data.id, data.title, data.completed);
  input.value = '';
}

function renderTaskItem(id, title, completed) {
  const ul = document.getElementById('todo-list');
  if (!ul) return;
  
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.setAttribute('data-id', id);
  
  li.innerHTML = `
    <label class="checkbox-container">
      <input type="checkbox" ${completed ? 'checked' : ''}>
      <span class="checkmark"></span>
      <span class="task-text ${completed ? 'done' : ''}">${title}</span>
    </label>
    <button class="delete-task">✕</button>
  `;

  li.querySelector('input[type="checkbox"]').addEventListener('change', async (e) => {
    const isDone = e.target.checked;
    li.querySelector('.task-text').classList.toggle('done', isDone);
    await supabase.from('pomodoro_tasks').update({ completed: isDone }).eq('id', id);
  });

  li.querySelector('.delete-task').addEventListener('click', async () => {
    li.remove();
    await supabase.from('pomodoro_tasks').delete().eq('id', id);
  });

  ul.appendChild(li);
}