import {
  Plus,
  LogOut,
  Clock3,
  Users,
  BookOpen,
  Flame,
  GraduationCap,
  FileText,
  Target,
  Sparkles,
  DoorOpen,
} from "lucide-react";

function DashboardAluno({ setTela, alunoPerfil }) {
  const perfilAluno = alunoPerfil || {
    nome: "Aluno",
    nivel: "Fundamental",
    ano: "8º Ano",
    foco: "Matemática",
    curso: "",
    periodo: "",
    instituicao: "",
  };

  const materias =
    perfilAluno.nivel === "Superior"
      ? [
          "Introdução ao Curso",
          "Metodologia Científica",
          "Comunicação Acadêmica",
          "Ética Profissional",
        ]
      : perfilAluno.nivel === "Médio"
      ? [
          "Português",
          "Matemática",
          "Biologia",
          "Física",
          "Química",
          "História",
          "Geografia",
          "Inglês",
        ]
      : [
          "Português",
          "Matemática",
          "Ciências",
          "História",
          "Geografia",
          "Inglês",
          "Artes",
          "Educação Física",
        ];

  const salasRecomendadas = [
    {
      titulo:
        perfilAluno.nivel === "Superior"
          ? `${perfilAluno.curso || "Curso Superior"} - Grupo de Estudos`
          : `Matemática ${perfilAluno.ano}`,
      tema:
        perfilAluno.nivel === "Superior"
          ? `Sala recomendada para estudantes de ${perfilAluno.curso || "ensino superior"}.`
          : "Frações, equações e resolução de exercícios.",
      alunos: 24,
      tempo: "50 min",
      tag: "Mais indicada",
    },
    {
      titulo:
        perfilAluno.nivel === "Superior"
          ? "Metodologia Acadêmica"
          : "Ciências em Grupo",
      tema:
        perfilAluno.nivel === "Superior"
          ? "Organização de estudos, pesquisa e trabalhos acadêmicos."
          : "Revisão sobre conteúdos compatíveis com seu ano.",
      alunos: 18,
      tempo: "40 min",
      tag: "Compatível",
    },
    {
      titulo:
        perfilAluno.nivel === "Superior"
          ? "Revisão para Avaliações"
          : "História do Brasil",
      tema:
        perfilAluno.nivel === "Superior"
          ? "Grupo para revisão de provas e atividades do período."
          : "Brasil Colonial e revisão para prova.",
      alunos: 31,
      tempo: "45 min",
      tag: "Em alta",
    },
  ];

  const materiais = [
    {
      titulo:
        perfilAluno.nivel === "Superior"
          ? "Material do Curso"
          : "Lista de Matemática",
      descricao:
        perfilAluno.nivel === "Superior"
          ? `Material recomendado para ${perfilAluno.curso || "seu curso"}.`
          : `Exercícios de fixação para ${perfilAluno.ano}.`,
    },
    {
      titulo:
        perfilAluno.nivel === "Superior"
          ? "Resumo Acadêmico"
          : "Resumo de Ciências",
      descricao:
        perfilAluno.nivel === "Superior"
          ? "Resumo compatível com seu período de estudo."
          : "Material compatível com seu ano escolar.",
    },
    {
      titulo:
        perfilAluno.nivel === "Superior"
          ? "Planejamento de Estudos"
          : "Revisão de História",
      descricao:
        perfilAluno.nivel === "Superior"
          ? "Organização semanal para acompanhar as disciplinas."
          : "Conteúdo organizado para estudo rápido.",
    },
  ];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Rajdhani", "Segoe UI", sans-serif;
          background: #02080d;
          overflow: auto;
        }

        .aluno-page {
          min-height: 100vh;
          padding: 28px;
          color: white;
          background:
            radial-gradient(circle at left, rgba(0,255,120,.14), transparent 35%),
            radial-gradient(circle at right, rgba(0,180,255,.12), transparent 35%),
            #02141d;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .brand-icon {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          background: linear-gradient(135deg,#00e676,#ffe600 55%,#00a8ff);
          display: grid;
          place-items: center;
          color: #04111f;
          font-size: 30px;
          font-weight: 900;
          box-shadow: 0 0 25px rgba(0,230,118,.28);
        }

        .brand h1 {
          font-size: 42px;
          letter-spacing: 4px;
        }

        .logout-btn {
          height: 50px;
          padding: 0 20px;
          border-radius: 16px;
          background: rgba(255,255,255,.08);
          color: white;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 17px;
          font-weight: 800;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.12);
          font-family: "Rajdhani", sans-serif;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 22px;
          margin-bottom: 26px;
        }

        .hero-main,
        .profile-card {
          border-radius: 30px;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.08),
              rgba(255,255,255,.04)
            );
          border: 1px solid rgba(255,255,255,.1);
          backdrop-filter: blur(18px);
          box-shadow: 0 20px 60px rgba(0,0,0,.26);
          padding: 26px;
        }

        .hero-main small {
          color: #00e676;
          font-size: 18px;
          font-weight: 900;
        }

        .hero-main h2 {
          margin-top: 6px;
          font-size: 48px;
          line-height: 1;
        }

        .hero-main p {
          margin-top: 12px;
          font-size: 21px;
          color: #b6c7d9;
          max-width: 760px;
        }

        .actions {
          margin-top: 26px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn {
          height: 54px;
          padding: 0 22px;
          border-radius: 17px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Rajdhani", sans-serif;
          font-size: 17px;
          font-weight: 900;
          cursor: pointer;
          transition: .25s;
        }

        .primary-btn {
          border: none;
          background: linear-gradient(90deg,#00e676,#bdf000,#ffe600);
          color: #06111f;
          box-shadow: 0 0 25px rgba(0,230,118,.22);
        }

        .secondary-btn {
          background: rgba(255,255,255,.08);
          color: white;
          border: 1px solid rgba(255,255,255,.12);
          backdrop-filter: blur(10px);
        }

        .primary-btn:hover,
        .secondary-btn:hover {
          transform: translateY(-2px);
        }

        .profile-card h3 {
          font-size: 28px;
          margin-bottom: 18px;
        }

        .profile-list {
          display: grid;
          gap: 12px;
        }

        .profile-item {
          border-radius: 18px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-icon {
          width: 38px;
          height: 38px;
          border-radius: 13px;
          background: rgba(0,230,118,.12);
          color: #00e676;
          display: grid;
          place-items: center;
          border: 1px solid rgba(0,230,118,.25);
        }

        .profile-item strong {
          display: block;
          font-size: 17px;
        }

        .profile-item span {
          color: #b6c7d9;
          font-size: 14px;
          font-weight: 700;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 28px 0 16px;
        }

        .section-title h3 {
          font-size: 30px;
        }

        .section-title svg {
          color: #00e676;
        }

        .materias-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
        }

        .materia-card {
          min-height: 82px;
          border-radius: 22px;
          background:
            linear-gradient(
              135deg,
              rgba(2,20,16,.88),
              rgba(5,30,42,.76)
            );
          border: 1px solid rgba(0,168,255,.25);
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          backdrop-filter: blur(16px);
          transition: .25s;
        }

        .materia-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0,230,118,.42);
          box-shadow: 0 0 26px rgba(0,230,118,.12);
        }

        .materia-icon {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: rgba(0,230,118,.12);
          color: #00e676;
          display: grid;
          place-items: center;
          border: 1px solid rgba(0,230,118,.25);
        }

        .materia-card strong {
          font-size: 18px;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1.3fr .7fr;
          gap: 22px;
        }

        .salas-grid {
          display: grid;
          gap: 16px;
        }

        .sala-card,
        .material-card {
          border-radius: 26px;
          background:
            linear-gradient(
              135deg,
              rgba(2,20,16,.88),
              rgba(5,30,42,.76)
            );
          border: 1px solid rgba(0,168,255,.25);
          padding: 20px;
          backdrop-filter: blur(16px);
          box-shadow: 0 18px 46px rgba(0,0,0,.22);
        }

        .sala-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .sala-card h4 {
          font-size: 25px;
        }

        .tag {
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(0,230,118,.12);
          color: #00e676;
          font-size: 13px;
          font-weight: 900;
          white-space: nowrap;
        }

        .sala-card p,
        .material-card p {
          color: #b6c7d9;
          font-size: 16px;
          line-height: 1.35;
        }

        .sala-info {
          display: flex;
          gap: 18px;
          color: #dce8f5;
          font-size: 15px;
          font-weight: 800;
          margin-top: 16px;
        }

        .sala-info span {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .enter-btn {
          width: 100%;
          height: 46px;
          margin-top: 16px;
          border-radius: 15px;
          border: none;
          background: linear-gradient(90deg,#00e676,#bdf000,#ffe600);
          color: #06111f;
          font-family: "Rajdhani", sans-serif;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .materials-list {
          display: grid;
          gap: 16px;
        }

        .material-card h4 {
          font-size: 22px;
          margin-bottom: 8px;
        }

        .material-card small {
          color: #00e676;
          font-weight: 900;
          font-size: 14px;
        }

        @media(max-width: 1000px) {
          .hero,
          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 700px) {
          .aluno-page {
            padding: 20px;
          }

          .topbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }

          .hero-main h2 {
            font-size: 36px;
          }
        }
      `}</style>

      <main className="aluno-page">
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">C</div>
            <h1>CONECTA</h1>
          </div>

          <button className="logout-btn" onClick={() => setTela("login")}>
            <LogOut size={18} />
            Sair
          </button>
        </header>

        <section className="hero">
          <div className="hero-main">
            <small>AMBIENTE DO ALUNO</small>

            <h2>Bem-vindo, {perfilAluno.nome}</h2>

            <p>
              Suas recomendações são baseadas no seu perfil de estudo,
              ano escolar, curso e principais necessidades.
            </p>

            <div className="actions">
              <button className="primary-btn" onClick={() => setTela("criarSala")}>
                <Plus size={19} />
                Criar Sala
              </button>

              <button className="secondary-btn">
                <Flame size={19} />
                Salas em Alta
              </button>
            </div>
          </div>

          <aside className="profile-card">
            <h3>Seu Perfil</h3>

            <div className="profile-list">
              <div className="profile-item">
                <div className="profile-icon">
                  <GraduationCap size={20} />
                </div>

                <div>
                  <strong>{perfilAluno.nivel}</strong>
                  <span>
                    {perfilAluno.nivel === "Superior"
                      ? `${perfilAluno.curso || "Curso"} · ${perfilAluno.periodo}`
                      : perfilAluno.ano}
                  </span>
                </div>
              </div>

              {perfilAluno.nivel === "Superior" && (
                <div className="profile-item">
                  <div className="profile-icon">
                    <BookOpen size={20} />
                  </div>

                  <div>
                    <strong>Instituição</strong>
                    <span>{perfilAluno.instituicao || "Não informada"}</span>
                  </div>
                </div>
              )}

              <div className="profile-item">
                <div className="profile-icon">
                  <Target size={20} />
                </div>

                <div>
                  <strong>Foco Principal</strong>
                  <span>{perfilAluno.foco || materias[0]}</span>
                </div>
              </div>

              <div className="profile-item">
                <div className="profile-icon">
                  <Sparkles size={20} />
                </div>

                <div>
                  <strong>Recomendações</strong>
                  <span>Salas compatíveis com seu perfil</span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section>
          <div className="section-title">
            <BookOpen size={26} />
            <h3>Matérias do seu Perfil</h3>
          </div>

          <div className="materias-grid">
            {materias.map((materia) => (
              <article className="materia-card" key={materia}>
                <div className="materia-icon">
                  <BookOpen size={21} />
                </div>

                <strong>{materia}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="content-grid">
          <div>
            <div className="section-title">
              <Users size={26} />
              <h3>Salas Recomendadas</h3>
            </div>

            <div className="salas-grid">
              {salasRecomendadas.map((sala) => (
                <article className="sala-card" key={sala.titulo}>
                  <div className="sala-top">
                    <h4>{sala.titulo}</h4>
                    <span className="tag">{sala.tag}</span>
                  </div>

                  <p>{sala.tema}</p>

                  <div className="sala-info">
                    <span>
                      <Users size={16} />
                      {sala.alunos} alunos
                    </span>

                    <span>
                      <Clock3 size={16} />
                      {sala.tempo}
                    </span>
                  </div>

                  <button className="enter-btn" onClick={() => setTela("sala")}>
                    <DoorOpen size={17} />
                    Entrar na Sala
                  </button>
                </article>
              ))}
            </div>
          </div>

          <aside>
            <div className="section-title">
              <FileText size={26} />
              <h3>Materiais Recomendados</h3>
            </div>

            <div className="materials-list">
              {materiais.map((material) => (
                <article className="material-card" key={material.titulo}>
                  <small>
                    {perfilAluno.nivel === "Superior"
                      ? perfilAluno.periodo
                      : perfilAluno.ano}
                  </small>
                  <h4>{material.titulo}</h4>
                  <p>{material.descricao}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}

export default DashboardAluno;