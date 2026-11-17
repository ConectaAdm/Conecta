# Diagrama de Relacionamento (ER) — C.O.N.E.C.T.A

> Modelo de dados proposto para o MVP da plataforma acadêmica C.O.N.E.C.T.A
> (grupos de estudo, compartilhamento de materiais e networking entre universitários).
> Banco de dados: **Supabase (PostgreSQL)**.
>
> ⚠️ Revisar nomes de tabelas/colunas contra o schema real do Supabase antes de publicar.

## Diagrama

```mermaid
erDiagram
    INSTITUICAO ||--o{ CURSO : oferece
    INSTITUICAO ||--o{ USUARIO : "vincula"
    CURSO ||--o{ USUARIO : "cursa"
    USUARIO ||--o{ GRUPO_ESTUDO : "cria"
    USUARIO ||--o{ MEMBRO_GRUPO : "participa"
    GRUPO_ESTUDO ||--o{ MEMBRO_GRUPO : "possui"
    USUARIO ||--o{ MATERIAL : "publica"
    GRUPO_ESTUDO |o--o{ MATERIAL : "recebe"
    USUARIO ||--o{ CONEXAO : "solicita"
    USUARIO ||--o{ CONEXAO : "recebe"
    GRUPO_ESTUDO ||--o{ MENSAGEM : "contém"
    USUARIO ||--o{ MENSAGEM : "envia"

    INSTITUICAO {
        uuid id PK
        varchar nome
        varchar sigla
        varchar cidade
        varchar uf
    }

    CURSO {
        uuid id PK
        uuid instituicao_id FK
        varchar nome
        varchar area
    }

    USUARIO {
        uuid id PK
        uuid instituicao_id FK
        uuid curso_id FK
        varchar nome
        varchar email UK
        varchar senha_hash
        int periodo
        text bio
        varchar foto_url
        timestamp criado_em
    }

    GRUPO_ESTUDO {
        uuid id PK
        uuid criador_id FK
        varchar nome
        text descricao
        varchar disciplina
        boolean publico
        int limite_membros
        timestamp criado_em
    }

    MEMBRO_GRUPO {
        uuid id PK
        uuid grupo_id FK
        uuid usuario_id FK
        varchar papel
        varchar status
        timestamp entrou_em
    }

    MATERIAL {
        uuid id PK
        uuid autor_id FK
        uuid grupo_id FK
        varchar titulo
        text descricao
        varchar disciplina
        varchar tipo
        varchar arquivo_url
        timestamp publicado_em
    }

    CONEXAO {
        uuid id PK
        uuid solicitante_id FK
        uuid destinatario_id FK
        varchar status
        timestamp criado_em
    }

    MENSAGEM {
        uuid id PK
        uuid grupo_id FK
        uuid autor_id FK
        text conteudo
        timestamp enviada_em
    }
```

## Dicionário resumido

| Tabela | Descrição |
|---|---|
| `INSTITUICAO` | Universidades/faculdades de todo o Brasil. |
| `CURSO` | Cursos oferecidos por uma instituição. |
| `USUARIO` | Estudante cadastrado (tela de cadastro/login). |
| `GRUPO_ESTUDO` | Grupo criado por um usuário para estudar uma disciplina. |
| `MEMBRO_GRUPO` | Associativa N:N entre usuário e grupo (papel: `admin`/`membro`; status: `pendente`/`ativo`). |
| `MATERIAL` | Material acadêmico compartilhado, opcionalmente vinculado a um grupo. |
| `CONEXAO` | Relacionamento de networking entre dois usuários (status: `pendente`/`aceita`/`recusada`). |
| `MENSAGEM` | Mensagens trocadas dentro de um grupo. |

## Regras de integridade

- `USUARIO.email` é único.
- `MEMBRO_GRUPO` possui restrição única em (`grupo_id`, `usuario_id`).
- `CONEXAO` possui restrição única em (`solicitante_id`, `destinatario_id`) e `solicitante_id <> destinatario_id`.
- `MATERIAL.grupo_id` é opcional (material pode ser público, fora de grupo).
