# C.O.N.E.C.T.A - Plataforma Acadêmica (MVP)

O **C.O.N.E.C.T.A** é uma plataforma desenvolvida para conectar universitários de todo o Brasil, facilitando a formação de grupos de estudo, compartilhamento de materiais acadêmicos e networking entre estudantes de diversas instituições de ensino.

---

##  Tecnologias Utilizadas

* **Backend:** Node.js, Express
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Controle de Versão:** Git e GitHub

---

##  Estrutura do Projeto

```text
Conecta/
├── public/
│   ├── assets/        # Imagens e logotipos (ex: CONECTA-LOGO.png)
│   ├── css/           # Estilizações (login.css, cadastro.css, etc.)
│   └── pages/         # Telas HTML (index.html, login.html, cadastro.html)
├── .gitignore         # Arquivos ignorados pelo Git (ex: node_modules)
├── package.json       # Dependências e scripts do projeto
├── package-lock.json  # Mapeamento de versões de dependências
├── README.md          # Documentação do repositório
└── server.js          # Servidor principal da aplicação em Express
Como Executar o Projeto
Clonar o repositório:

Bash
git clone [https://github.com/ConectaAdm/Conecta.git](https://github.com/ConectaAdm/Conecta.git)
Acessar a pasta do projeto:

Bash
cd Conecta
Instalar as dependências do Node.js:

Bash
npm install
Iniciar o servidor:

Bash
node server.js
Acessar no navegador:
Abra http://localhost:3000 (ou a porta definida no console).

```
## Acesso Online

Visite o site do [Conecta](https://conecta-phi-five.vercel.app/) para mais informações.


---

## 📲 PWA (Progressive Web App)

O CONECTA pode ser instalado como aplicativo no celular e no computador.

* **`public/manifest.json`** — nome, cores e ícones do app.
* **`public/sw.js`** — service worker: guarda CSS/JS/imagens em cache e mantém as páginas já visitadas disponíveis offline.
* **`public/js/pwa.js`** — registra o service worker e mostra o botão "Instalar app".
* **`public/offline.html`** — tela exibida quando não há internet.
* **`public/icons/`** — ícones do app.

**Como instalar:** no Chrome/Edge, clique em "📲 Instalar app" ou no ícone de instalação da barra de endereço. No iPhone (Safari): Compartilhar → "Adicionar à Tela de Início".

> Ao publicar mudanças em CSS/JS, aumente `CACHE_VERSION` em `public/sw.js` (ex.: `v1` → `v2`) para os usuários receberem a versão nova.
=======
>>>>>>> 3c822b6e3bd92bfcd9a2358974cb4a435dd75097
