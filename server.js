const express = require('express');
const path = require('path'); // <- Faltava importar o módulo
const app = express();
const port = 3000;

// Servir os arquivos estáticos (CSS, JS, Imagens) da pasta public
app.use(express.static('public'));

// Rota principal (carrega o index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para a tela de Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'));
});

app.listen(port, () => {
    console.log(`Servidor ativo em http://localhost:${port}`);
});