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

### 1.1. **Criação de Cliente**

### `/clients`

### Exemplo de Request:
```
POST /clients
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "jaque",
    "email": "admin@com.br",
    "password": "123",
    "telephone": "123",
	"admin": true
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": 4,
	"name": "jaque",
	"email": "admin@com.brl",
	"telephone": "123",
	"admin": true,
	"createdAt": "2024-01-31",
	"deletedAt": null
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already exists |
| 400 Bad Request   | Required |
---

---

### 1.2. **Listando Clientes**

### `/clients`

### Exemplo de Request:
```
GET /clients
Authorization: Bearer token / Apenas admin tem acesso
Content-type: application/json

```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"clients": [
		{
			"id": 1,
			"name": "jaque",
			"email": "user@com.br",
			"admin": false,
			"telephone": "123",
			"createdAt": "2024-01-31",
			"deletedAt": null
		} ] 
}
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.


## Contato

Se você tiver dúvidas ou comentários, entre em contato através do e-mail [jaquelinejhirose@gmail.com](mailto:jaquelinejhirose@gmail.com).
