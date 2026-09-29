// Importa o framework Express para criação de rotas e gerenciamento do servidor
const express = require('express');

// Importa o módulo nativo 'path' do Node.js para manipular caminhos de arquivos e diretórios
const path = require('path');

// Inicializa a aplicação Express
const app = express();

// Define a porta em que o servidor irá rodar (neste caso, a porta 3000)
const port = 3000;

// Configura o Express para servir arquivos estáticos (como CSS, imagens, JavaScript do cliente) a partir da pasta 'public'
app.use(express.static('public'));

// Rota principal: renderiza a página inicial (Home)
app.get('/', (req, res) => {
    // Retorna o arquivo 'index.html' localizado diretamente na pasta 'public'
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para a página de Login
app.get('/login', (req, res) => {
    // Retorna o arquivo 'login.html' dentro da subpasta 'pages'
    res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'));
});

// Rota para a página de Cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'cadastro.html'));
});

// Rota para a página do Painel de Controle (Dashboard)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'dashboard.html'));
});

// Rota para a página do Chat de conversas
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'chat.html'));
});

// Rota para a página de Materiais de estudo ou conteúdo
app.get('/materiais', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'materiais.html'));
});

// Rota para a ferramenta de produtividade Pomodoro
app.get('/pomodoro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'pomodoro.html'));
});

// Rota para a página de Perfil do usuário
app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'perfil.html'));
});

// Inicia o servidor e faz com que ele escute as requisições na porta definida
app.listen(port, () => {
    // Exibe uma mensagem no console indicando que o servidor está rodando com sucesso
    console.log(`Servidor ativo em http://localhost:${port}`);
});
