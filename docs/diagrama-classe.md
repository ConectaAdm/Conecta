# Diagrama de Classes — C.O.N.E.C.T.A

> Modelo de domínio proposto para o MVP. O backend atual é Node.js + Express
> (`server.js`) com acesso ao Supabase (`supabaseClient.js`); as classes abaixo
> representam as entidades e serviços lógicos do sistema.
>
> ⚠️ Revisar contra o código real antes de publicar.

## Modelo de domínio

```mermaid
classDiagram
    class Instituicao {
        +UUID id
        +String nome
        +String sigla
        +String cidade
        +String uf
    }

    class Curso {
        +UUID id
        +String nome
        +String area
    }

    class Usuario {
        +UUID id
        +String nome
        +String email
        -String senhaHash
        +int periodo
        +String bio
        +String fotoUrl
        +Date criadoEm
        +cadastrar()
        +autenticar(email, senha) boolean
        +atualizarPerfil()
        +criarGrupo(dados) GrupoEstudo
        +entrarNoGrupo(grupo)
        +publicarMaterial(dados) Material
        +solicitarConexao(usuario) Conexao
    }

    class GrupoEstudo {
        +UUID id
        +String nome
        +String descricao
        +String disciplina
        +boolean publico
        +int limiteMembros
        +Date criadoEm
        +adicionarMembro(usuario)
        +removerMembro(usuario)
        +enviarMensagem(autor, texto)
    }

    class MembroGrupo {
        +UUID id
        +PapelMembro papel
        +StatusMembro status
        +Date entrouEm
        +aprovar()
        +recusar()
    }

    class Material {
        +UUID id
        +String titulo
        +String descricao
        +String disciplina
        +TipoMaterial tipo
        +String arquivoUrl
        +Date publicadoEm
        +baixar()
        +remover()
    }

    class Conexao {
        +UUID id
        +StatusConexao status
        +Date criadoEm
        +aceitar()
        +recusar()
    }

    class Mensagem {
        +UUID id
        +String conteudo
        +Date enviadaEm
    }

    class PapelMembro {
        <<enumeration>>
        ADMIN
        MEMBRO
    }

    class StatusMembro {
        <<enumeration>>
        PENDENTE
        ATIVO
    }

    class StatusConexao {
        <<enumeration>>
        PENDENTE
        ACEITA
        RECUSADA
    }

    class TipoMaterial {
        <<enumeration>>
        PDF
        RESUMO
        LISTA_EXERCICIOS
        LINK
        OUTRO
    }

    Instituicao "1" --> "*" Curso : oferece
    Instituicao "1" --> "*" Usuario : vincula
    Curso "1" --> "*" Usuario : cursado por
    Usuario "1" --> "*" GrupoEstudo : cria
    GrupoEstudo "1" *-- "*" MembroGrupo : possui
    Usuario "1" --> "*" MembroGrupo : participa
    Usuario "1" --> "*" Material : publica
    GrupoEstudo "0..1" o-- "*" Material : agrupa
    GrupoEstudo "1" *-- "*" Mensagem : contém
    Usuario "1" --> "*" Mensagem : envia
    Usuario "1" --> "*" Conexao : solicita
    Usuario "1" --> "*" Conexao : recebe
    MembroGrupo --> PapelMembro
    MembroGrupo --> StatusMembro
    Conexao --> StatusConexao
    Material --> TipoMaterial
```

## Camadas da aplicação

```mermaid
classDiagram
    class Servidor {
        <<server.js - Express>>
        +rotasPaginas()
        +rotasAPI()
        +iniciar(porta)
    }

    class SupabaseClient {
        <<supabaseClient.js>>
        +from(tabela)
        +auth
        +storage
    }

    class Frontend {
        <<public/>>
        +index.html
        +login.html
        +cadastro.html
        +pwa.js
        +sw.js
    }

    class BancoDeDados {
        <<Supabase / PostgreSQL>>
    }

    Frontend --> Servidor : HTTP
    Servidor --> SupabaseClient : usa
    SupabaseClient --> BancoDeDados : consulta
```
