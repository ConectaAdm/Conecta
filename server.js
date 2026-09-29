const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'cadastro.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'dashboard.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'chat.html'));
});

app.get('/materiais', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'materiais.html'));
});

app.get('/pomodoro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'pomodoro.html'));
});

app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'perfil.html'));
});

app.listen(port, () => {
    console.log(`Servidor ativo em http://localhost:${port}`);
});