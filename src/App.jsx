import { useState } from "react";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import DashboardAluno from "./pages/DashboardAluno";
import DashboardProfessor from "./pages/DashboardProfessor";
import CriarSala from "./pages/CriarSala";
import SalaEstudo from "./pages/SalaEstudo";
import SerieProfessor from "./pages/SerieProfessor";
import AreaProfessor from "./pages/AreaProfessor";
import NovoMaterialProfessor from "./pages/NovoMaterialProfessor";

function App() {
  const [tela, setTela] = useState("login");

  const [alunoPerfil, setAlunoPerfil] = useState({
    nome: "Aluno",
    perfil: "Aluno",
    nivel: "Fundamental",
    ano: "8º Ano",
    curso: "",
    periodo: "",
    instituicao: "",
  });

  const [professorFluxo, setProfessorFluxo] = useState({
    ano: "",
    materia: "",
    area: "",
  });

  return (
    <>
      {tela === "login" && <Login setTela={setTela} />}

      {tela === "cadastro" && (
        <Cadastro setTela={setTela} setAlunoPerfil={setAlunoPerfil} />
      )}

      {tela === "aluno" && (
        <DashboardAluno setTela={setTela} alunoPerfil={alunoPerfil} />
      )}

  {tela === "criarSala" && (
  <CriarSala
    setTela={setTela}
    alunoPerfil={alunoPerfil}
  />
)}

      {tela === "sala" && <SalaEstudo setTela={setTela} />}

      {tela === "professor" && (
        <DashboardProfessor
          setTela={setTela}
          setProfessorFluxo={setProfessorFluxo}
        />
      )}

      {tela === "serieProfessor" && (
        <SerieProfessor
          setTela={setTela}
          professorFluxo={professorFluxo}
          setProfessorFluxo={setProfessorFluxo}
        />
      )}

      {tela === "areaProfessor" && (
        <AreaProfessor setTela={setTela} professorFluxo={professorFluxo} />
      )}

      {tela === "novoMaterialProfessor" && (
        <NovoMaterialProfessor
          setTela={setTela}
          professorFluxo={professorFluxo}
        />
      )}
    </>
  );
}

export default App;