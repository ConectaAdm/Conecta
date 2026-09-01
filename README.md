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
├── node_modules/
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
