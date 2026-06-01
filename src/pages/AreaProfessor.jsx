import {
  ArrowLeft,
  Plus,
  FileText,
  ClipboardList,
  CalendarDays,
  Download,
  Eye,
  Trash2,
} from "lucide-react";

function AreaProfessor({ setTela, professorFluxo }) {
  const ano = professorFluxo?.ano || "Ano Escolar";
  const materia = professorFluxo?.materia || "Matéria";
  const area = professorFluxo?.area || "Área";

  const iconeArea =
    area === "Exercícios" ? (
      <ClipboardList size={24} />
    ) : area === "Provas" ? (
      <FileText size={24} />
    ) : (
      <CalendarDays size={24} />
    );

  const materiais = [
    {
      titulo:
        area === "Exercícios"
          ? "Lista de Atividades 01"
          : area === "Provas"
          ? "Avaliação Bimestral"
          : "Planejamento Mensal",
      tipo: area,
      descricao:
        area === "Exercícios"
          ? `Atividades de fixação de ${materia} para ${ano}.`
          : area === "Provas"
          ? `Modelo de prova de ${materia} para ${ano}.`
          : `Organização de aulas e objetivos de ${materia} para ${ano}.`,
      icone: iconeArea,
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

        .area-page {
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
          margin-bottom: 28px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
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
          max-width: 760px;
        }

        .add-btn {
          height: 52px;
          padding: 0 22px;
          border-radius: 17px;
          border: none;
          background: linear-gradient(90deg,#00e676,#bdf000,#ffe600);
          color: #06111f;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Rajdhani", sans-serif;
          font-size: 17px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 0 25px rgba(0,230,118,.22);
        }

        .content {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 22px;
        }

        .panel {
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
          padding: 24px;
        }

        .materials {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .material-card {
          min-height: 112px;
          border-radius: 24px;
          background:
            linear-gradient(
              135deg,
              rgba(2,20,16,.88),
              rgba(5,30,42,.76)
            );
          border: 1px solid rgba(0,168,255,.25);
          padding: 18px;
          display: grid;
          grid-template-columns: 56px 1fr auto;
          gap: 16px;
          align-items: center;
          transition: .25s;
        }

        .material-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0,230,118,.42);
          box-shadow: 0 0 26px rgba(0,230,118,.12);
        }

        .material-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: rgba(0,230,118,.12);
          color: #00e676;
          display: grid;
          place-items: center;
          border: 1px solid rgba(0,230,118,.25);
        }

        .material-card h3 {
          font-size: 24px;
        }

        .material-card span {
          display: inline-block;
          margin-top: 4px;
          color: #00e676;
          font-size: 15px;
          font-weight: 900;
        }

        .material-card p {
          margin-top: 6px;
          color: #b6c7d9;
          font-size: 15px;
          line-height: 1.35;
        }

        .material-actions {
          display: flex;
          gap: 10px;
        }

        .icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.08);
          color: white;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .delete {
          color: #ff6b6b;
        }

        .side-card {
          min-height: 260px;
        }

        .side-card h3 {
          font-size: 28px;
          margin-bottom: 16px;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .info-item {
          border-radius: 18px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          padding: 16px;
        }

        .info-item strong {
          display: block;
          font-size: 18px;
          margin-bottom: 4px;
        }

        .info-item span {
          color: #b6c7d9;
          font-size: 15px;
          font-weight: 700;
        }

        @media(max-width: 980px) {
          .content {
            grid-template-columns: 1fr;
          }

          .hero {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media(max-width: 760px) {
          .area-page {
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

          .material-card {
            grid-template-columns: 1fr;
          }

          .material-actions {
            justify-content: flex-start;
          }
        }
      `}</style>

      <main className="area-page">
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">C</div>
            <h1>CONECTA</h1>
          </div>

          <button className="back-btn" onClick={() => setTela("serieProfessor")}>
            <ArrowLeft size={18} />
            Voltar
          </button>
        </header>

        <section className="hero">
          <div>
            <small>{ano}</small>

            <h2>{materia}</h2>

            <p>
              Gerencie {area} de {materia} para {ano}.
            </p>
          </div>

          <button
            className="add-btn"
            onClick={() => setTela("novoMaterialProfessor")}
          >
            <Plus size={19} />
            Adicionar Material
          </button>
        </section>

        <section className="content">
          <section className="panel">
            <div className="materials">
              {materiais.map((item) => (
                <article className="material-card" key={item.titulo}>
                  <div className="material-icon">{item.icone}</div>

                  <div>
                    <h3>{item.titulo}</h3>
                    <span>{item.tipo}</span>
                    <p>{item.descricao}</p>
                  </div>

                  <div className="material-actions">
                    <button className="icon-btn">
                      <Eye size={18} />
                    </button>

                    <button className="icon-btn">
                      <Download size={18} />
                    </button>

                    <button className="icon-btn delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="panel side-card">
            <h3>Resumo da Área</h3>

            <div className="info-list">
              <div className="info-item">
                <strong>Ano Escolar</strong>
                <span>{ano}</span>
              </div>

              <div className="info-item">
                <strong>Matéria</strong>
                <span>{materia}</span>
              </div>

              <div className="info-item">
                <strong>Área</strong>
                <span>{area}</span>
              </div>

              <div className="info-item">
                <strong>Organização</strong>
                <span>Materiais separados por ano, matéria e área.</span>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}

export default AreaProfessor;