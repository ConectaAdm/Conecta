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