import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  FileText,
  CalendarDays,
  Eye,
} from "lucide-react";

function SerieProfessor({ setTela, professorFluxo, setProfessorFluxo }) {
  const materiasBase = [
    "Português",
    "Matemática",
    "Ciências",
    "História",
    "Geografia",
    "Inglês",
    "Artes",
    "Educação Física",
  ];

  const materiasInfantil = [
    "Linguagem",
    "Matemática Inicial",
    "Natureza e Sociedade",
    "Artes",
    "Movimento",
  ];

  const anoSelecionado = professorFluxo?.ano || "Ano Escolar";

  const materias =
    anoSelecionado === "Pré 1" || anoSelecionado === "Pré 2"
      ? materiasInfantil
      : materiasBase;

  function abrirArea(materia, area) {
    setProfessorFluxo({
      ...professorFluxo,
      materia,
      area,
    });

    setTela("areaProfessor");
  }

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

        .serie-page {
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
          margin-bottom: 32px;
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

        .back-btn {
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
          margin-bottom: 30px;
        }

        .hero small {
          color: #00e676;
          font-size: 18px;
          font-weight: 900;
        }

        .hero h2 {
          margin-top: 6px;
          font-size: 48px;
          line-height: 1;
        }

        .hero p {
          margin-top: 10px;
          font-size: 21px;
          color: #b6c7d9;
        }

        .materias-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
        }

        .materia-card {
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

        .materia-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .materia-icon {
          width: 48px;
          height: 48px;
          border-radius: 15px;
          background: rgba(0,230,118,.12);
          color: #00e676;
          display: grid;
          place-items: center;
          border: 1px solid rgba(0,230,118,.25);
        }

        .materia-header h3 {
          font-size: 27px;
        }

        .areas {
          display: grid;
          gap: 12px;
        }

        .area-btn {
          width: 100%;
          min-height: 58px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.07);
          color: white;
          display: grid;
          grid-template-columns: 34px 1fr 24px;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          cursor: pointer;
          font-family: "Rajdhani", sans-serif;
          text-align: left;
          transition: .25s;
        }

        .area-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(0,230,118,.42);
          background: rgba(255,255,255,.1);
        }

        .area-btn strong {
          font-size: 17px;
        }

        .area-btn span {
          color: #b6c7d9;
          font-size: 14px;
          font-weight: 700;
        }

        @media(max-width: 760px) {
          .serie-page {
            padding: 20px;
          }

          .topbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }

          .hero h2 {
            font-size: 36px;
          }
        }
      `}</style>

      <main className="serie-page">
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">C</div>
            <h1>CONECTA</h1>
          </div>

          <button className="back-btn" onClick={() => setTela("professor")}>
            <ArrowLeft size={18} />
            Voltar
          </button>
        </header>

        <section className="hero">
          <small>ÁREA DO PROFESSOR</small>

          <h2>{anoSelecionado}</h2>

          <p>
            Selecione uma matéria para acessar exercícios, provas e planejamento escolar.
          </p>
        </section>

        <section className="materias-grid">
          {materias.map((materia) => (
            <article className="materia-card" key={materia}>
              <div className="materia-header">
                <div className="materia-icon">
                  <BookOpen size={24} />
                </div>

                <h3>{materia}</h3>
              </div>

              <div className="areas">
                <button
                  className="area-btn"
                  onClick={() => abrirArea(materia, "Exercícios")}
                >
                  <ClipboardList size={22} />

                  <div>
                    <strong>Exercícios</strong>
                    <span>Listas, práticas e atividades de fixação.</span>
                  </div>

                  <Eye size={18} />
                </button>

                <button
                  className="area-btn"
                  onClick={() => abrirArea(materia, "Provas")}
                >
                  <FileText size={22} />

                  <div>
                    <strong>Provas</strong>
                    <span>Avaliações, simulados e revisões.</span>
                  </div>

                  <Eye size={18} />
                </button>

                <button
                  className="area-btn"
                  onClick={() => abrirArea(materia, "Planejamento Escolar")}
                >
                  <CalendarDays size={22} />

                  <div>
                    <strong>Planejamento Escolar</strong>
                    <span>Organização semanal, mensal e anual.</span>
                  </div>

                  <Eye size={18} />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

export default SerieProfessor;