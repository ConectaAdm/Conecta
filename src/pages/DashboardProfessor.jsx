import {
  LogOut,
  GraduationCap,
  School,
  Eye,
} from "lucide-react";

function DashboardProfessor({ setTela, setProfessorFluxo }) {
  const segmentos = [
    {
      titulo: "Educação Infantil",
      anos: ["Pré 1", "Pré 2"],
    },
    {
      titulo: "Ensino Fundamental",
      anos: [
        "1º Ano",
        "2º Ano",
        "3º Ano",
        "4º Ano",
        "5º Ano",
        "6º Ano",
        "7º Ano",
        "8º Ano",
        "9º Ano",
      ],
    },
    {
      titulo: "Ensino Médio",
      anos: ["1º Ano EM", "2º Ano EM", "3º Ano EM"],
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

        .prof-page {
          min-height: 100vh;
          padding: 28px;
          background:
            radial-gradient(circle at left, rgba(0,255,120,.14), transparent 35%),
            radial-gradient(circle at right, rgba(0,180,255,.12), transparent 35%),
            #02141d;
          color: white;
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

        .segmento {
          margin-bottom: 30px;
        }

        .segmento-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .segmento-icon {
          width: 46px;
          height: 46px;
          border-radius: 15px;
          background: rgba(0,230,118,.12);
          color: #00e676;
          display: grid;
          place-items: center;
          border: 1px solid rgba(0,230,118,.25);
        }

        .segmento h3 {
          font-size: 30px;
        }

        .anos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 16px;
        }

        .ano-card {
          min-height: 142px;
          border-radius: 24px;
          background:
            linear-gradient(
              135deg,
              rgba(2,20,16,.88),
              rgba(5,30,42,.76)
            );
          border: 1px solid rgba(0,168,255,.25);
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: .25s;
          backdrop-filter: blur(16px);
          box-shadow: 0 18px 46px rgba(0,0,0,.22);
        }

        .ano-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0,230,118,.42);
          box-shadow: 0 0 26px rgba(0,230,118,.12);
        }

        .ano-card h4 {
          font-size: 26px;
        }

        .ano-card p {
          margin-top: 6px;
          color: #b6c7d9;
          font-size: 15px;
          line-height: 1.35;
        }

        .ano-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 18px;
        }

        .ano-footer span {
          color: #dce8f5;
          font-size: 14px;
          font-weight: 800;
        }

        .open-btn {
          height: 36px;
          padding: 0 12px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.08);
          color: white;
          display: flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          font-family: "Rajdhani", sans-serif;
          font-weight: 800;
        }

        @media(max-width: 760px) {
          .prof-page {
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

      <main className="prof-page">
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
          <small>AMBIENTE DO PROFESSOR</small>

          <h2>Escolha o Ano Escolar</h2>

          <p>
            Depois selecione a matéria para acessar exercícios, provas e planejamento escolar.
          </p>
        </section>

        {segmentos.map((segmento) => (
          <section className="segmento" key={segmento.titulo}>
            <div className="segmento-header">
              <div className="segmento-icon">
                <School size={24} />
              </div>

              <h3>{segmento.titulo}</h3>
            </div>

            <div className="anos-grid">
              {segmento.anos.map((ano) => (
                <article className="ano-card" key={ano}>
                  <div>
                    <h4>{ano}</h4>

                    <p>
                      Matérias organizadas com exercícios, provas e planejamento escolar.
                    </p>
                  </div>

                  <div className="ano-footer">
                    <span>
                      <GraduationCap size={15} /> Área do professor
                    </span>

                    <button
                      className="open-btn"
                      onClick={() => setTela("serieProfessor")}
                    >
                      <Eye size={15} />
                      Acessar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default DashboardProfessor;