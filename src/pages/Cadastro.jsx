import { useState } from "react";
import {
  UserRound,
  Mail,
  LockKeyhole,
  GraduationCap,
  ArrowLeft,
  Sparkles,
  School,
  BookOpen,
  Building2,
} from "lucide-react";

function Cadastro({ setTela, setAlunoPerfil }) {
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    senha: "",
    perfil: "Aluno",
    nivel: "Fundamental",
    ano: "6º Ano",
    curso: "",
    periodo: "1º Período",
    instituicao: "",
  });

  function atualizar(campo, valor) {
    setDados((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function criarConta() {
    setAlunoPerfil({
      nome: dados.nome || "Aluno",
      perfil: dados.perfil,
      nivel: dados.nivel,
      ano: dados.nivel === "Superior" ? dados.periodo : dados.ano,
      curso: dados.curso,
      periodo: dados.periodo,
      instituicao: dados.instituicao,
    });

    if (dados.perfil === "Professor") {
      setTela("professor");
      return;
    }

    setTela("aluno");
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
          overflow: hidden;
        }

        .cadastro-page {
          width: 100vw;
          height: 100vh;
          padding: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at 18% 20%, rgba(0,230,118,.18), transparent 28%),
            radial-gradient(circle at 82% 24%, rgba(0,168,255,.18), transparent 30%),
            linear-gradient(135deg,#02080d,#03130f 45%,#06162e);
        }

        .cadastro-card {
          width: 100%;
          max-width: 470px;
          border-radius: 30px;
          padding: 20px 30px 18px;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(22px);
          border: 1px solid rgba(255,255,255,.7);
          box-shadow:
            0 20px 60px rgba(0,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.6);
          position: relative;
          overflow: hidden;
        }

        .cadastro-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top left, rgba(0,230,118,.08), transparent 40%),
            radial-gradient(circle at bottom right, rgba(0,168,255,.08), transparent 40%);
          pointer-events: none;
        }

        .cadastro-card > * {
          position: relative;
          z-index: 2;
        }

        .cadastro-icon {
          width: 46px;
          height: 46px;
          margin: 0 auto 10px;
          border-radius: 50%;
          border: 2px solid rgba(0,230,118,.4);
          display: grid;
          place-items: center;
          color: #126b46;
        }

        .cadastro-card h1 {
          text-align: center;
          color: #091a2f;
          font-size: 28px;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .cadastro-card > p {
          text-align: center;
          color: #445166;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.22;
          margin-bottom: 18px;
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

        .create-btn {
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
          box-shadow:
            0 10px 24px rgba(0,230,118,.25),
            inset 0 0 0 1px rgba(255,255,255,.35);
        }

        .back-btn {
          margin: 11px auto 0;
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

      <main className="cadastro-page">
        <section className="cadastro-card">
          <div className="cadastro-icon">
            <Sparkles size={23} strokeWidth={2.4} />
          </div>

          <h1>Criar Conta</h1>

          <p>
            Informe seu perfil de estudo para o CONECTA<br />
            sugerir salas mais adequadas para você.
          </p>

          <label>
            Nome Completo
            <div className="field">
              <UserRound size={18} strokeWidth={2.2} />
              <input
                value={dados.nome}
                onChange={(e) => atualizar("nome", e.target.value)}
                placeholder="Digite seu nome"
              />
            </div>
          </label>

          <label>
            E-mail
            <div className="field">
              <Mail size={18} strokeWidth={2.2} />
              <input
                value={dados.email}
                onChange={(e) => atualizar("email", e.target.value)}
                placeholder="seuemail@exemplo.com"
              />
            </div>
          </label>

          <label>
            Senha
            <div className="field">
              <LockKeyhole size={18} strokeWidth={2.2} />
              <input
                type="password"
                value={dados.senha}
                onChange={(e) => atualizar("senha", e.target.value)}
                placeholder="Crie uma senha"
              />
            </div>
          </label>

          <div className="double">
            <label>
              Perfil
              <div className="field">
                <GraduationCap size={18} strokeWidth={2.2} />
                <select
                  value={dados.perfil}
                  onChange={(e) => atualizar("perfil", e.target.value)}
                >
                  <option>Aluno</option>
                  <option>Professor</option>
                </select>
              </div>
            </label>

            <label>
              Nível
              <div className="field">
                <School size={18} strokeWidth={2.2} />
                <select
                  value={dados.nivel}
                  onChange={(e) => {
                    const nivel = e.target.value;

                    setDados((atual) => ({
                      ...atual,
                      nivel,
                      ano: nivel === "Fundamental" ? "6º Ano" : "1º Ano Médio",
                      periodo: "1º Período",
                    }));
                  }}
                >
                  <option>Fundamental</option>
                  <option>Médio</option>
                  <option>Superior</option>
                </select>
              </div>
            </label>
          </div>

          {dados.nivel === "Fundamental" && (
            <label>
              Ano Escolar
              <div className="field">
                <BookOpen size={18} strokeWidth={2.2} />
                <select
                  value={dados.ano}
                  onChange={(e) => atualizar("ano", e.target.value)}
                >
                  <option>6º Ano</option>
                  <option>7º Ano</option>
                  <option>8º Ano</option>
                  <option>9º Ano</option>
                </select>
              </div>
            </label>
          )}

          {dados.nivel === "Médio" && (
            <label>
              Ano Escolar
              <div className="field">
                <BookOpen size={18} strokeWidth={2.2} />
                <select
                  value={dados.ano}
                  onChange={(e) => atualizar("ano", e.target.value)}
                >
                  <option>1º Ano Médio</option>
                  <option>2º Ano Médio</option>
                  <option>3º Ano Médio</option>
                </select>
              </div>
            </label>
          )}

          {dados.nivel === "Superior" && (
            <>
              <div className="double">
                <label>
                  Curso
                  <div className="field">
                    <Building2 size={18} strokeWidth={2.2} />
                    <input
                      value={dados.curso}
                      onChange={(e) => atualizar("curso", e.target.value)}
                      placeholder="Ex: Direito"
                    />
                  </div>
                </label>

                <label>
                  Período
                  <div className="field">
                    <BookOpen size={18} strokeWidth={2.2} />
                    <select
                      value={dados.periodo}
                      onChange={(e) => atualizar("periodo", e.target.value)}
                    >
                      <option>1º Período</option>
                      <option>2º Período</option>
                      <option>3º Período</option>
                      <option>4º Período</option>
                      <option>5º Período</option>
                      <option>6º Período</option>
                      <option>7º Período</option>
                      <option>8º Período</option>
                      <option>9º Período</option>
                      <option>10º Período</option>
                    </select>
                  </div>
                </label>
              </div>

              <label>
                Instituição
                <div className="field">
                  <Building2 size={18} strokeWidth={2.2} />
                  <input
                    value={dados.instituicao}
                    onChange={(e) => atualizar("instituicao", e.target.value)}
                    placeholder="Ex: Univassouras"
                  />
                </div>
              </label>
            </>
          )}

          <button className="create-btn" onClick={criarConta}>
            Criar Conta
          </button>

          <button className="back-btn" onClick={() => setTela("login")}>
            <ArrowLeft size={17} />
            Voltar para Login
          </button>
        </section>
      </main>
    </>
  );
}

export default Cadastro;