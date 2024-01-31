# Fullstack - Projeto Final

Projeto final do bootcamp Kenzie Academy com finalidade de cadastro de clientes que poderá conter muitos contatos associados.

---

## Visão geral

Tecnologias usadas:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

---

## Instalação

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
npm install
```

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

---

## Uso

Para rodar o projeto:

```
npm start
```

ou

```
 npm run dev
```

Configurado para rodar em http://localhost:3000/

---

## Configuração

Execute as migrations com o comando:

```
npm run typeorm:generate
```

depois

```
npm run typeorm:run
```

---

## Endpoints

- [Clients](#1-clients)
  - [POST - /clients](#11-criação-de-cliente)
  - [GET - /clients](#12-listando-clientes)
  - [GET - /clients/:client_id/contacts](#13-listar-contatos-por-cliente)
    - [PATCH - /clients/:client_id](#13-alterar-cliente)
    - [DELETE - /clients/:client_id](#14-deletar-cliente)
- [Contacts](#2-contacts)
  - [POST - /contacts](#21-criação-de-contato)
  - [GET - /contacts](#22-listando-contatos)
  - [PATCH - /contacts/:contact_id](#23-alterar-contato)
  - [DELETE - /contacts/:contact_id](#24-deletar-contato)(#13-listar-usuário-por-id)
- [Login](#3-login)
  - [POST - /login](#31-login)

## 1. **Clients**

O objeto Client é definido como:

| Campo     | Tipo    | Descrição                                   |
| --------- | ------- | ------------------------------------------- |
| id        | number  | Identificador único do cliente              |
| name      | string  | O nome do cliente                           |
| email     | string  | O e-mail do cliente                         |
| password  | string  | A senha de acesso do cliente                |
| telephone | string  | O telefone do cliente                       |
| admin     | boolean | Define se um usuário é Administrador ou não |
| createdAt | string  | Data da criação do cliente                  |
| deletedAt | string  | Data da deleção do cliente                  |

### Endpoints

| Método | Rota                         | Descrição                          |
| ------ | ---------------------------- | ---------------------------------- |
| POST   | /clients                     | Criação de um cliente.             |
| GET    | /clients                     | Lista todos os clientes            |
| GET    | /clients/:client_id/contacts | Lista todos os contatos do cliente |
| PATCH  | /clients                     | Edita cliente                      |
| DELETE | /clients                     | Deleta cliente                     |

---

## Contato

Se você tiver dúvidas ou comentários, entre em contato através do e-mail [jaquelinejhirose@gmail.com](mailto:jaquelinejhirose@gmail.com).
