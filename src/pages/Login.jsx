import {
  LockKeyhole,
  Mail,
  Eye,
  UserRound,
  GraduationCap,
  UsersRound,
} from "lucide-react";

function Login({ setTela }) {
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

        .login-page {
          width: 100vw;
          height: 100vh;
          padding: 14px 22px;
          display: grid;
          grid-template-columns: 1.42fr 0.92fr;
          gap: 28px;
          background:
            radial-gradient(circle at 18% 20%, rgba(0,230,118,.18), transparent 28%),
            radial-gradient(circle at 82% 24%, rgba(0,168,255,.18), transparent 30%),
            linear-gradient(135deg,#02080d,#03130f 45%,#06162e);
        }

        .left {
          position: relative;
          overflow: hidden;
          border-radius: 30px;
          border: 1px solid rgba(0,168,255,.7);
          background:
            radial-gradient(circle at 18% 40%, rgba(0,230,118,.15), transparent 32%),
            radial-gradient(circle at 78% 44%, rgba(0,168,255,.14), transparent 35%),
            #020d10;
          color: white;
        }

        .left::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
          background-size: 38px 38px;
          opacity: .6;
        }

        .left::after {
          content: "";
          position: absolute;
          left: -120px;
          right: -120px;
          bottom: -120px;
          height: 280px;
          background:
            repeating-radial-gradient(
              ellipse at center,
              rgba(0,168,255,.55) 0 1px,
              transparent 2px 13px
            );
          opacity: .45;
          transform: rotate(-5deg);
        }

        .mapa {
          position: absolute;
          top: 28px;
          left: 52px;
          width: 240px;
          height: 165px;
          border: 2px solid rgba(0,230,118,.75);
          clip-path: polygon(
            20% 5%, 43% 6%, 56% 17%, 72% 13%, 88% 30%,
            83% 49%, 95% 68%, 74% 79%, 64% 94%, 48% 84%,
            31% 92%, 18% 75%, 7% 63%, 14% 42%, 5% 28%
          );
          filter: drop-shadow(0 0 14px rgba(0,230,118,.8));
          z-index: 3;
        }

        .logo {
          position: relative;
          z-index: 5;
          text-align: center;
          margin-top: 42px;
        }

        .logo-c {
          width: 94px;
          height: 94px;
          margin: 0 auto 18px;
          border-radius: 28px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg,#00e676,#ffe600 50%,#00a8ff);
          color: #03130f;
          font-size: 56px;
          font-weight: 900;
          animation: glowPulse 3s infinite ease-in-out;
        }

        .logo h1 {
          margin: 0;
          font-family: "Orbitron", sans-serif;
          font-size: 86px;
          line-height: .9;
          letter-spacing: 12px;
          color: white;
          text-shadow:
            0 0 18px rgba(255,255,255,.45),
            0 0 35px rgba(0,230,118,.3);
        }

        .logo p {
          margin: 14px 0 0;
          color: #d7fbe8;
          font-size: 20px;
          letter-spacing: 8px;
        }

        .decor {
          margin-top: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .decor::before,
        .decor::after {
          content: "";
          width: 70px;
          height: 3px;
          border-radius: 999px;
        }

        .decor::before {
          background: linear-gradient(90deg,#00e676,#ffe600);
        }

        .decor::after {
          background: linear-gradient(90deg,#ffe600,#00a8ff);
        }

        .decor span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .decor span:nth-child(1) { background: #00e676; }
        .decor span:nth-child(2) { background: #ffe600; }
        .decor span:nth-child(3) { background: #00a8ff; }

        .headline {
          position: relative;
          z-index: 5;
          margin-top: 32px;
          text-align: center;
        }

        .headline h2 {
          margin: 0;
          font-size: 44px;
          letter-spacing: 4px;
          font-weight: 900;
          text-shadow: 0 0 18px rgba(0,230,118,.45);
        }

        .headline h3 {
          margin: 10px 0 0;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .headline p {
          margin: 22px 0 0;
          color: #d7fbe8;
          font-size: 21px;
          line-height: 1.28;
        }

        .sala {
          position: absolute;
          z-index: 6;
          left: 64px;
          right: 64px;
          bottom: 26px;
          min-height: 96px;
          border-radius: 24px;
          border: 1px solid #ffe600;
          background: linear-gradient(135deg, rgba(2,20,16,.92), rgba(5,30,42,.82));
          box-shadow: 0 0 25px rgba(0,168,255,.12);
          display: grid;
          grid-template-columns: 72px 1fr 72px;
          align-items: center;
          gap: 18px;
          padding: 14px 24px;
          backdrop-filter: blur(18px);
        }

        .people {
          width: 66px;
          height: 66px;
          border-radius: 50%;
          border: 2px solid #00e676;
          display: grid;
          place-items: center;
          color: #00e676;
        }

        .sala strong {
          color: #00e676;
          font-size: 18px;
          font-weight: 900;
        }

        .sala p {
          margin: 10px 0 0;
          color: white;
          font-size: 16px;
          font-weight: 800;
        }

        .tempo {
          width: 66px;
          height: 66px;
          border-radius: 50%;
          border: 2px solid #ffe600;
          display: grid;
          place-items: center;
          color: white;
        }

        .tempo b {
          font-size: 30px;
          line-height: .8;
          color: #ffe600;
        }

        .tempo span {
          margin-top: -10px;
          font-size: 14px;
        }

        .right {
          width: 100%;
          max-width: 520px;
          height: calc(100vh - 28px);
          justify-self: center;
          align-self: center;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(22px);
          border-radius: 34px;
          padding: 28px 42px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow:
            0 20px 60px rgba(0,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.6);
          border: 1px solid rgba(255,255,255,.7);
          position: relative;
          overflow: hidden;
        }

        .right::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top left, rgba(0,230,118,.08), transparent 40%),
            radial-gradient(circle at bottom right, rgba(0,168,255,.08), transparent 40%);
          pointer-events: none;
        }

        .right > * {
          position: relative;
          z-index: 2;
        }

        .lock {
          width: 54px;
          height: 54px;
          margin: 0 auto 18px;
          border-radius: 50%;
          border: 2px solid rgba(0,230,118,.4);
          display: grid;
          place-items: center;
          color: #126b46;
        }

        .right h2 {
          margin: 0 0 22px;
          color: #091a2f;
          font-size: 28px;
          text-align: center;
          font-weight: 900;
        }

        label {
          display: block;
          text-align: left;
          margin-bottom: 16px;
          color: #071d3a;
          font-size: 16px;
          font-weight: 800;
        }

        .field {
          margin-top: 7px;
          height: 54px;
          border: 1px solid #cbd5e1;
          border-radius: 15px;
          display: grid;
          grid-template-columns: 36px 1fr 36px;
          align-items: center;
          padding: 0 16px;
          background: #f8fafc;
          color: #64748b;
        }

        input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 17px;
          color: #111827;
        }

        .choose-text {
          text-align: center;
          margin: 20px 0 14px;
          color: #445166;
          font-size: 18px;
          font-weight: 700;
        }

        .aluno,
        .professor {
          width: 100%;
          height: 56px;
          border-radius: 17px;
          font-size: 18px;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: .25s;
          font-family: "Rajdhani", sans-serif;
          line-height: 1;
        }

        .aluno {
          border: 2px solid rgba(255,255,255,.55);
          background: linear-gradient(110deg, #00e676, #bdf000 52%, #ffe600);
          color: #07111f;
          box-shadow:
            0 10px 24px rgba(0,230,118,.25),
            inset 0 0 0 1px rgba(255,255,255,.35);
        }

        .aluno:hover {
          transform: translateY(-2px);
          box-shadow:
            0 16px 34px rgba(0,230,118,.35),
            inset 0 0 0 1px rgba(255,255,255,.45);
        }

        .professor {
          margin-top: 14px;
          border: 2px solid #0066d8;
          background: rgba(255,255,255,.9);
          color: #0066d8;
          box-shadow:
            0 8px 20px rgba(0,102,216,.08),
            inset 0 0 0 1px rgba(255,255,255,.7);
        }

        .professor:hover {
          transform: translateY(-2px);
          background: #eef6ff;
        }

        .ou {
          margin: 14px 0 8px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px;
          align-items: center;
          color: #64748b;
          font-size: 15px;
        }

        .ou span {
          height: 1px;
          background: #cbd5e1;
        }

        .criar {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
        }

        .criar p {
          color: #667085;
          font-size: 15px;
          font-weight: 600;
        }

        .criar button {
          border: 1px solid rgba(0,230,118,.22);
          background:
            linear-gradient(180deg, rgba(255,255,255,.95), rgba(245,255,248,.82));
          color: #00a651;
          font-size: 17px;
          font-weight: 800;
          cursor: pointer;
          padding: 10px 28px;
          border-radius: 999px;
          font-family: "Rajdhani", sans-serif;
          transition: .25s;
          box-shadow:
            0 10px 24px rgba(0,230,118,.08),
            inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter: blur(12px);
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 20px rgba(0,230,118,.35); }
          50% {
            box-shadow:
              0 0 35px rgba(0,230,118,.65),
              0 0 60px rgba(0,168,255,.35);
          }
          100% { box-shadow: 0 0 20px rgba(0,230,118,.35); }
        }
      `}</style>

      <main className="login-page">
        <section className="left">
          <div className="mapa"></div>

          <div className="logo">
            <div className="logo-c">C</div>
            <h1>CONECTA</h1>
            <p>Conectando Você aos Estudos</p>

            <div className="decor">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="headline">
            <h2>FOCO E COLABORAÇÃO:</h2>
            <h3>o caminho para grandes resultados.</h3>
            <p>
              Entre em salas de estudo, encontre pessoas
              <br />
              com objetivos parecidos e aprenda sem distrações.
            </p>
          </div>

          <div className="sala">
            <div className="people">
              <UsersRound size={34} strokeWidth={2.4} />
            </div>

            <div>
              <strong>SALA EM DESTAQUE</strong>
              <p>REVISÃO DE MATEMÁTICA BÁSICA</p>
            </div>

            <div className="tempo">
              <b>50</b>
              <span>min</span>
            </div>
          </div>
        </section>

        <section className="right">
          <div className="lock">
            <LockKeyhole size={28} strokeWidth={2.4} />
          </div>

          <h2>Acesse sua Conta</h2>

          <label>
            E-mail
            <div className="field">
              <Mail size={20} strokeWidth={2.2} />
              <input placeholder="seuemail@exemplo.com" />
              <span></span>
            </div>
          </label>

          <label>
            Senha
            <div className="field">
              <LockKeyhole size={20} strokeWidth={2.2} />
              <input type="password" placeholder="Digite sua senha" />
              <Eye size={20} strokeWidth={2.2} />
            </div>
          </label>

          <p className="choose-text">Escolha seu Ambiente de Estudo</p>

          <button className="aluno" onClick={() => setTela("aluno")}>
            <UserRound size={21} strokeWidth={2.4} />
            Entrar como Aluno
          </button>

          <button className="professor" onClick={() => setTela("professor")}>
            <GraduationCap size={23} strokeWidth={2.4} />
            Entrar como Professor
          </button>

          <div className="ou">
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          <div className="criar">
            <p>Ainda não tem conta?</p>
            <button onClick={() => setTela("cadastro")}>
              Criar Conta
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;