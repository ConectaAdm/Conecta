import {
  ArrowLeft,
  Save,
  FileText,
  ClipboardList,
  CalendarDays,
  UploadCloud,
  Type,
  AlignLeft,
} from "lucide-react";

function NovoMaterialProfessor({ setTela, professorFluxo }) {
  const ano = professorFluxo?.ano || "Ano Escolar";
  const materia = professorFluxo?.materia || "Matéria";
  const area = professorFluxo?.area || "Área";

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

        .novo-page {
          width: 100vw;
          height: 100vh;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at 18% 20%, rgba(0,230,118,.18), transparent 28%),
            radial-gradient(circle at 82% 24%, rgba(0,168,255,.18), transparent 30%),
            linear-gradient(135deg,#02080d,#03130f 45%,#06162e);
        }

        .novo-card {
          width: 100%;
          max-width: 540px;
          border-radius: 32px;
          padding: 26px 38px 24px;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(22px);
          border: 1px solid rgba(255,255,255,.7);
          box-shadow:
            0 20px 60px rgba(0,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.6);
          position: relative;
          overflow: hidden;
        }

        .novo-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top left, rgba(0,230,118,.08), transparent 40%),
            radial-gradient(circle at bottom right, rgba(0,168,255,.08), transparent 40%);
          pointer-events: none;
        }

        .novo-card > * {
          position: relative;
          z-index: 2;
        }

        .novo-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 12px;
          border-radius: 50%;
          border: 2px solid rgba(0,230,118,.4);
          display: grid;
          place-items: center;
          color: #126b46;
        }

        .novo-card h1 {
          text-align: center;
          color: #091a2f;
          font-size: 30px;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .contexto {
          text-align: center;
          color: #445166;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 22px;
        }

        .contexto strong {
          color: #00a651;
        }

        label {
          display: block;
          margin-bottom: 13px;
          color: #071d3a;
          font-size: 16px;
          font-weight: 800;
        }

        .field {
          margin-top: 7px;
          min-height: 50px;
          border: 1px solid #cbd5e1;
          border-radius: 15px;
          display: grid;
          grid-template-columns: 34px 1fr;
          align-items: center;
          padding: 0 15px;
          background: #f8fafc;
          color: #64748b;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          color: #111827;
          font-family: "Rajdhani", sans-serif;
        }

        .field textarea {
          min-height: 72px;
          resize: none;
          padding: 13px 0;
        }

        .field.textarea {
          align-items: flex-start;
          padding-top: 0;
        }

        .field.textarea svg {
          margin-top: 14px;
        }

        .upload-box {
          margin-top: 7px;
          height: 68px;
          border-radius: 17px;
          border: 1px dashed rgba(0,168,255,.55);
          background: rgba(248,250,252,.85);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #445166;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
        }

        .upload-box input {
          display: none;
        }

        .actions {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .save-btn {
          width: 100%;
          height: 52px;
          border-radius: 16px;
          border: 2px solid rgba(255,255,255,.55);
          background: linear-gradient(110deg, #00e676, #bdf000 52%, #ffe600);
          color: #07111f;
          font-size: 18px;
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

      <main className="novo-page">
        <section className="novo-card">
          <div className="novo-icon">
            <UploadCloud size={26} strokeWidth={2.4} />
          </div>

          <h1>Novo Material</h1>

          <p className="contexto">
            {ano} · <strong>{materia}</strong>
            <br />
            {area}
          </p>

          <label>
            Título do Material
            <div className="field">
              <Type size={19} strokeWidth={2.2} />
              <input placeholder={`Ex: ${area} de ${materia}`} />
            </div>
          </label>

          <label>
            Tipo
            <div className="field">
              {area === "Exercícios" ? (
                <ClipboardList size={19} strokeWidth={2.2} />
              ) : area === "Provas" ? (
                <FileText size={19} strokeWidth={2.2} />
              ) : (
                <CalendarDays size={19} strokeWidth={2.2} />
              )}

              <select defaultValue={area}>
                <option>Exercícios</option>
                <option>Provas</option>
                <option>Planejamento Escolar</option>
              </select>
            </div>
          </label>

          <label>
            Descrição
            <div className="field textarea">
              <AlignLeft size={19} strokeWidth={2.2} />
              <textarea placeholder="Descreva o objetivo do material..." />
            </div>
          </label>

          <label>
            Arquivo
            <div className="upload-box">
              <UploadCloud size={21} strokeWidth={2.2} />
              <span>Anexar PDF ou DOCX</span>
              <input type="file" accept=".pdf,.doc,.docx" />
            </div>
          </label>

          <div className="actions">
            <button className="save-btn" onClick={() => setTela("areaProfessor")}>
              <Save size={19} strokeWidth={2.4} />
              Salvar Material
            </button>

            <button className="back-btn" onClick={() => setTela("areaProfessor")}>
              <ArrowLeft size={17} />
              Voltar para Área
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default NovoMaterialProfessor;