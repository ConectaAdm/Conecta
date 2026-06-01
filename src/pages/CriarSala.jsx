import {
  ArrowLeft,
  BookOpen,
  Users,
  Clock3,
  Sparkles,
  Plus,
  GraduationCap,
  Target,
  Building2,
} from "lucide-react";

function CriarSala({ setTela, alunoPerfil }) {
  const perfil = alunoPerfil || {
    nivel: "Fundamental",
    ano: "8º Ano",
    curso: "",
    periodo: "",
    instituicao: "",
  };

  const materias =
    perfil.nivel === "Superior"
      ? [
          "Introdução ao Curso",
          "Metodologia Científica",
          "Comunicação Acadêmica",
          "Ética Profissional",
        ]
      : perfil.nivel === "Médio"
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
          overflow: hidden;
        }

        .criar-page {
          width: 100vw;
          height: 100vh;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at 18% 20%, rgba(0,230,118,.18), transparent 28%),
            radial-gradient(circle at 82% 24%, rgba(0,168,255,.18), transparent 30%),
            linear-gradient(135deg,#02080d,#03130f 45%,#06162e);
        }

        .criar-card {
          width: 100%;
          max-width: 500px;
          border-radius: 30px;
          padding: 20px 28px 18px;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(22px);
          border: 1px solid rgba(255,255,255,.7);
          box-shadow:
            0 20px 60px rgba(0,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.6);
          position: relative;
          overflow: hidden;
        }

        .criar-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top left, rgba(0,230,118,.08), transparent 40%),
            radial-gradient(circle at bottom right, rgba(0,168,255,.08), transparent 40%);
          pointer-events: none;
        }

        .criar-card > * {
          position: relative;
          z-index: 2;
        }

        .criar-icon {
          width: 46px;
          height: 46px;
          margin: 0 auto 10px;
          border-radius: 50%;
          border: 2px solid rgba(0,230,118,.4);
          display: grid;
          place-items: center;
          color: #126b46;
        }

        .criar-card h1 {
          text-align: center;
          color: #091a2f;
          font-size: 26px;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .criar-card > p {
          text-align: center;
          color: #445166;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.22;
          margin-bottom: 18px;
        }

        .perfil-box {
          margin-bottom: 13px;
          border-radius: 16px;
          background: rgba(0,230,118,.08);
          border: 1px solid rgba(0,230,118,.18);
          padding: 12px 14px;
          color: #071d3a;
        }

        .perfil-box strong {
          display: block;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .perfil-box span {
          color: #445166;
          font-size: 14px;
          font-weight: 700;
        }

        label {
          display: block;
          margin-bottom: 10px;
          color: #071d3a;
          font-size: 15px;
          font-weight: 800;
        }

        .field {
          margin-top: 6px;
          height: 44px;
          border: 1px solid #cbd5e1;
          border-radius: 14px;
          display: grid;
          grid-template-columns: 32px 1fr;
          align-items: center;
          padding: 0 14px;
          background: #f8fafc;
          color: #64748b;
        }

        .field input,
        .field select {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: 15px;
          color: #111827;
          font-family: "Rajdhani", sans-serif;
        }

        .double {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .create-room-btn {
          width: 100%;
          height: 48px;
          margin-top: 8px;
          border-radius: 15px;
          border: 2px solid rgba(255,255,255,.55);
          background: linear-gradient(110deg, #00e676, #bdf000 52%, #ffe600);
          color: #07111f;
          font-size: 17px;
          font-weight: 900;
          cursor: pointer;
          font-family: "Rajdhani", sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow:
            0 10px 24px rgba(0,230,118,.25),
            inset 0 0 0 1px rgba(255,255,255,.35);
        }

        .back-btn {
          margin: 12px auto 0;
          border: none;
          background: transparent;
          color: #0066d8;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: "Rajdhani", sans-serif;
        }
      `}</style>

      <main className="criar-page">
        <section className="criar-card">
          <div className="criar-icon">
            <Sparkles size={22} strokeWidth={2.4} />
          </div>

          <h1>Criar Sala</h1>

          <p>
            Crie uma sala compatível com seu perfil<br />
            para conectar alunos com o mesmo objetivo.
          </p>

          <div className="perfil-box">
            <strong>Perfil da Sala</strong>
            <span>
              {perfil.nivel === "Superior"
                ? `${perfil.curso || "Curso Superior"} · ${perfil.periodo || "Período"}`
                : `${perfil.nivel} · ${perfil.ano}`}
            </span>
          </div>

          <label>
            Nome da Sala
            <div className="field">
              <BookOpen size={18} strokeWidth={2.2} />
              <input placeholder="Ex: Revisão de Matemática" />
            </div>
          </label>

          <div className="double">
            <label>
              Matéria
              <div className="field">
                <GraduationCap size={18} strokeWidth={2.2} />
                <select>
                  {materias.map((materia) => (
                    <option key={materia}>{materia}</option>
                  ))}
                </select>
              </div>
            </label>

            <label>
              Duração
              <div className="field">
                <Clock3 size={18} strokeWidth={2.2} />
                <select>
                  <option>30 minutos</option>
                  <option>45 minutos</option>
                  <option>1 hora</option>
                  <option>1h 30min</option>
                  <option>2 horas</option>
                </select>
              </div>
            </label>
          </div>

          {perfil.nivel === "Superior" && (
            <label>
              Instituição
              <div className="field">
                <Building2 size={18} strokeWidth={2.2} />
                <input
                  defaultValue={perfil.instituicao}
                  placeholder="Ex: Univassouras"
                />
              </div>
            </label>
          )}

          <label>
            Tema da Sala
            <div className="field">
              <Target size={18} strokeWidth={2.2} />
              <input placeholder="Ex: Frações, equações, revisão de prova..." />
            </div>
          </label>

          <div className="double">
            <label>
              Participantes
              <div className="field">
                <Users size={18} strokeWidth={2.2} />
                <select>
                  <option>Sem limite</option>
                  <option>10 alunos</option>
                  <option>20 alunos</option>
                  <option>30 alunos</option>
                  <option>50 alunos</option>
                </select>
              </div>
            </label>

            <label>
              Objetivo
              <div className="field">
                <Target size={18} strokeWidth={2.2} />
                <select>
                  <option>Revisão</option>
                  <option>Exercícios</option>
                  <option>Prova</option>
                  <option>Trabalho</option>
                  <option>Dúvidas</option>
                </select>
              </div>
            </label>
          </div>

          <button className="create-room-btn" onClick={() => setTela("sala")}>
            <Plus size={18} strokeWidth={2.4} />
            Criar Sala Inteligente
          </button>

          <button className="back-btn" onClick={() => setTela("aluno")}>
            <ArrowLeft size={17} />
            Voltar para Dashboard
          </button>
        </section>
      </main>
    </>
  );
}

export default CriarSala;