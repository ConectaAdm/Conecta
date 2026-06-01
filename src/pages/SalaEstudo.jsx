import {
  ArrowLeft,
  Users,
  Clock3,
  MessageCircle,
  Send,
  CheckCircle2,
  BookOpen,
  Mic,
  Video,
} from "lucide-react";

function SalaEstudo({ setTela }) {
  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          font-family:"Rajdhani","Segoe UI",sans-serif;
          background:#02080d;
          overflow:hidden;
        }

        .sala-page{
          width:100vw;
          height:100vh;

          padding:24px;

          background:
            radial-gradient(circle at 18% 20%, rgba(0,230,118,.18), transparent 28%),
            radial-gradient(circle at 82% 24%, rgba(0,168,255,.18), transparent 30%),
            linear-gradient(135deg,#02080d,#03130f 45%,#06162e);

          color:white;

          display:grid;
          grid-template-columns:1fr 360px;
          gap:22px;
        }

        .main-room,
        .side-panel{
          border-radius:30px;

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.08),
              rgba(255,255,255,.04)
            );

          border:1px solid rgba(255,255,255,.1);

          backdrop-filter:blur(18px);

          box-shadow:
            0 20px 60px rgba(0,0,0,.28);

          position:relative;
          overflow:hidden;
        }

        .main-room{
          padding:28px;

          display:flex;
          flex-direction:column;
        }

        .room-header{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;

          margin-bottom:26px;
        }

        .room-title small{
          color:#00e676;
          font-size:17px;
          font-weight:800;
        }

        .room-title h1{
          font-size:44px;
          line-height:1;
          margin-top:6px;
        }

        .back-btn{
          height:46px;

          padding:0 18px;

          border:none;

          border-radius:15px;

          background:rgba(255,255,255,.08);

          color:white;

          display:flex;
          align-items:center;
          gap:8px;

          font-size:16px;
          font-weight:800;

          cursor:pointer;

          font-family:"Rajdhani",sans-serif;

          border:1px solid rgba(255,255,255,.12);
        }

        .stats{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:16px;

          margin-bottom:24px;
        }

        .stat-card{
          min-height:92px;

          border-radius:22px;

          background:rgba(255,255,255,.07);

          border:1px solid rgba(255,255,255,.1);

          padding:18px;

          display:flex;
          align-items:center;
          gap:14px;
        }

        .stat-icon{
          width:48px;
          height:48px;

          border-radius:16px;

          display:grid;
          place-items:center;

          color:#00e676;

          background:rgba(0,230,118,.12);
        }

        .stat-card strong{
          display:block;

          font-size:24px;

          line-height:1;

          margin-bottom:4px;
        }

        .stat-card span{
          color:#b6c7d9;

          font-size:15px;
          font-weight:700;
        }

        .study-area{
          flex:1;

          border-radius:28px;

          background:
            linear-gradient(
              135deg,
              rgba(2,20,16,.92),
              rgba(5,30,42,.82)
            );

          border:1px solid rgba(0,168,255,.35);

          padding:26px;

          display:flex;
          flex-direction:column;
          justify-content:space-between;

          position:relative;
          overflow:hidden;
        }

        .study-area::before{
          content:"";

          position:absolute;
          inset:0;

          background-image:
            linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);

          background-size:36px 36px;

          opacity:.45;
        }

        .study-content{
          position:relative;
          z-index:2;
        }

        .study-content h2{
          font-size:34px;
          margin-bottom:12px;
        }

        .study-content p{
          color:#c6d6e8;

          font-size:20px;

          max-width:720px;

          line-height:1.45;
        }

        .tools{
          position:relative;
          z-index:2;

          display:flex;
          gap:14px;
        }

        .tool-btn{
          height:48px;

          padding:0 18px;

          border-radius:15px;

          border:1px solid rgba(255,255,255,.14);

          background:rgba(255,255,255,.08);

          color:white;

          font-family:"Rajdhani",sans-serif;

          font-size:16px;
          font-weight:800;

          cursor:pointer;

          display:flex;
          align-items:center;
          gap:8px;
        }

        .finish-btn{
          margin-left:auto;

          border:none;

          background:
            linear-gradient(
              90deg,
              #00e676,
              #bdf000,
              #ffe600
            );

          color:#06111f;
        }

        .side-panel{
          padding:24px;

          display:flex;
          flex-direction:column;
        }

        .side-panel h2{
          font-size:28px;

          margin-bottom:18px;
        }

        .participants{
          display:flex;
          flex-direction:column;
          gap:12px;

          margin-bottom:22px;
        }

        .participant{
          height:54px;

          border-radius:17px;

          background:rgba(255,255,255,.07);

          border:1px solid rgba(255,255,255,.1);

          display:flex;
          align-items:center;
          gap:12px;

          padding:0 14px;
        }

        .avatar{
          width:34px;
          height:34px;

          border-radius:50%;

          background:linear-gradient(135deg,#00e676,#00a8ff);

          display:grid;
          place-items:center;

          color:#04111f;

          font-weight:900;
        }

        .participant span{
          font-size:16px;
          font-weight:800;
        }

        .chat{
          flex:1;

          border-radius:22px;

          background:rgba(255,255,255,.06);

          border:1px solid rgba(255,255,255,.1);

          padding:16px;

          display:flex;
          flex-direction:column;
        }

        .chat-title{
          display:flex;
          align-items:center;
          gap:8px;

          color:#dce8f5;

          font-size:18px;
          font-weight:900;

          margin-bottom:14px;
        }

        .messages{
          flex:1;

          display:flex;
          flex-direction:column;
          gap:10px;

          overflow:hidden;
        }

        .message{
          padding:10px 12px;

          border-radius:14px;

          background:rgba(255,255,255,.08);

          color:#dce8f5;

          font-size:15px;
          line-height:1.35;
        }

        .message strong{
          color:#00e676;
        }

        .chat-input{
          margin-top:14px;

          height:46px;

          border-radius:15px;

          background:#f8fafc;

          display:grid;
          grid-template-columns:1fr 42px;
          align-items:center;

          padding:0 8px 0 14px;
        }

        .chat-input input{
          border:none;
          outline:none;

          background:transparent;

          font-size:16px;

          font-family:"Rajdhani",sans-serif;
        }

        .chat-input button{
          width:34px;
          height:34px;

          border:none;

          border-radius:12px;

          background:#0066d8;

          color:white;

          display:grid;
          place-items:center;

          cursor:pointer;
        }
      `}</style>

      <main className="sala-page">

        <section className="main-room">

          <header className="room-header">

            <div className="room-title">
              <small>SALA DE ESTUDO</small>

              <h1>Matemática Básica</h1>
            </div>

            <button
              className="back-btn"
              onClick={() => setTela("aluno")}
            >
              <ArrowLeft size={18}/>
              Dashboard
            </button>

          </header>

          <section className="stats">

            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24}/>
              </div>

              <div>
                <strong>24</strong>
                <span>participantes</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Clock3 size={24}/>
              </div>

              <div>
                <strong>50 min</strong>
                <span>duração sugerida</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <BookOpen size={24}/>
              </div>

              <div>
                <strong>Foco</strong>
                <span>resolução prática</span>
              </div>
            </div>

          </section>

          <section className="study-area">

            <div className="study-content">
              <h2>Objetivo da Sala</h2>

              <p>
                Revisar conceitos essenciais de matemática básica,
                resolver exercícios em grupo e manter um ambiente
                colaborativo sem distrações.
              </p>
            </div>

            <div className="tools">

              <button className="tool-btn">
                <Mic size={18}/>
                Áudio
              </button>

              <button className="tool-btn">
                <Video size={18}/>
                Vídeo
              </button>

              <button
                className="tool-btn finish-btn"
                onClick={() => setTela("aluno")}
              >
                <CheckCircle2 size={18}/>
                Finalizar Estudo
              </button>

            </div>

          </section>

        </section>

        <aside className="side-panel">

          <h2>Participantes</h2>

          <div className="participants">

            <div className="participant">
              <div className="avatar">A</div>
              <span>Aluno Conectado</span>
            </div>

            <div className="participant">
              <div className="avatar">M</div>
              <span>Maria Estudos</span>
            </div>

            <div className="participant">
              <div className="avatar">J</div>
              <span>João Revisão</span>
            </div>

          </div>

          <section className="chat">

            <div className="chat-title">
              <MessageCircle size={18}/>
              Chat da Sala
            </div>

            <div className="messages">

              <div className="message">
                <strong>Maria:</strong> Vamos começar por frações?
              </div>

              <div className="message">
                <strong>João:</strong> Boa, depois porcentagem.
              </div>

              <div className="message">
                <strong>Você:</strong> Fechado.
              </div>

            </div>

            <div className="chat-input">
              <input placeholder="Digite uma mensagem..." />

              <button>
                <Send size={17}/>
              </button>
            </div>

          </section>

        </aside>

      </main>
    </>
  );
}

export default SalaEstudo;