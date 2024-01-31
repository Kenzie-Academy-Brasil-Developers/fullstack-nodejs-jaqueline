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
  - [PATCH - /clients/:client_id](#14-alterar-cliente)
  - [DELETE - /clients/:client_id](#15-deletar-cliente)
- [Contacts](#2-contacts)
  - [POST - /contacts](#21-criação-de-contato)
  - [GET - /contacts](#22-listando-contatos)
  - [PATCH - /contacts/:contact_id](#23-alterar-contato)
  - [DELETE - /contacts/:contact_id](#24-deletar-contato)
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

| Código do Erro  | Descrição            |
| --------------- | -------------------- |
| 409 Conflict    | Email already exists |
| 400 Bad Request | Required             |

---

---

### 1.2. **Listando Clientes**

### `/clients`

### Exemplo de Request:

```
GET /clients
Authorization: Bearer token / Apenas admin tem acesso

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
      "password": "$2a$10$GOVHRGPp2tBTkXSD7rUCzeWeskNaNSrH.JG35ajCWgdpVGjmFCySC",
      "admin": false,
      "telephone": "123",
      "createdAt": "2024-01-31",
      "deletedAt": null
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro    | Descrição               |
| ----------------- | ----------------------- |
| 401 Unhauthorized | Missing bearer token    |
| 403 Forbidden     | Insufficient permission |

---

### 1.3. **Listar Contatos por Cliente**

### `/clients/:client_id/contacts`

### Exemplo de Request:

```
GET /clients/:client_id/contacts
Authorization: Bearer token / Apenas admin e próprio cliente tem acesso

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
  "client": {
    "id": 1,
    "name": "jaque",
    "email": "user@com.br",
    "password": "$2a$10$GOVHRGPp2tBTkXSD7rUCzeWeskNaNSrH.JG35ajCWgdpVGjmFCySC",
    "admin": false,
    "telephone": "123",
    "createdAt": "2024-01-31",
    "deletedAt": null
  },
  "contacts": [
    {
      "id": 2,
      "name": "jaque",
      "email": "user@dmin.com",
      "telephone": "123",
      "createdAt": "2024-01-31",
      "deletedAt": null,
      "clientId": 1
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro    | Descrição               |
| ----------------- | ----------------------- |
| 404 Not Found     | Client not found        |
| 401 Unhauthorized | Missing bearer token    |
| 403 Forbidden     | Insufficient permission |

---

### 1.4. **Alterar Cliente**

### `/clients/:client_id`

### Exemplo de Request:

```
PATCH /clients/:client_id
Authorization: Bearer token / Apenas admin e próprio cliente tem acesso
Content-type: application/json

```

### Corpo da Requisição:

Campos opcionais. Apenas admin não é alterável.

```json
{
  "name": "jaque",
  "email": "admin@com.br",
  "password": "123",
  "telephone": "123"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
	{
	"id": 4,
	"name": "jaque",
	"email": "1n23@123.com",
	"telephone": "123",
	"admin": false,
	"createdAt": "2024-01-31",
	"deletedAt": null
}
}
```

### Possíveis Erros:

| Código do Erro    | Descrição               |
| ----------------- | ----------------------- |
| 404 Not Found     | Client not found        |
| 401 Unhauthorized | Missing bearer token    |
| 403 Forbidden     | Insufficient permission |
| 409 Conflict      | Email already exists    |

---

### 1.5. **Deletar Cliente**

### `/clients/:client_id`

### Exemplo de Request:

```
DELETE /clients/:client_id
Authorization: Bearer token / Apenas admin e próprio cliente tem acesso
Content-type: application/json

```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 OK
```

```json
Vazio
```

### Possíveis Erros:

| Código do Erro    | Descrição               |
| ----------------- | ----------------------- |
| 404 Not Found     | Client not found        |
| 401 Unhauthorized | Missing bearer token    |
| 403 Forbidden     | Insufficient permission |

---

## 2. **Contacts**

O objeto Contact é definido como:

| Campo     | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| id        | number | Identificador único do contato |
| name      | string | O nome do contato              |
| email     | string | O e-mail do contato            |
| telephone | string | O telefone do contato          |
| createdAt | string | Data da criação do contato     |
| deletedAt | string | Data da deleção do contato     |
| clientId  | number | Id do cliente                  |

### Endpoints

| Método | Rota      | Descrição               |
| ------ | --------- | ----------------------- |
| POST   | /contacts | Criação de um contato   |
| GET    | /contacts | Lista todos os contatos |
| PATCH  | /contacts | Edita contato           |
| DELETE | /contacts | Deleta contato          |

---

### 2.1. **Criação de Contact**

### `/contacts`

### Exemplo de Request:

```
POST /contacts
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "jaque",
  "email": "user@dmin.com.br",
  "telephone": "123",
  "clientId": 1
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "name": "jaque",
  "email": "user@dmin.com.br",
  "telephone": "123",
  "clientId": 1,
  "client": {
    "id": 1,
    "name": "jaque",
    "email": "user@com.br",
    "admin": false,
    "telephone": "123",
    "createdAt": "2024-01-31",
    "deletedAt": null
  },
  "id": 8,
  "createdAt": "2024-01-31",
  "deletedAt": null
}
```

### Possíveis Erros:

| Código do Erro  | Descrição            |
| --------------- | -------------------- |
| 409 Conflict    | Email already exists |
| 400 Bad Request | Required             |

---

### 2.2. **Listando Contatos**

### `/contacts`

### Exemplo de Request:

```
GET /contacts
Authorization: Bearer token / Apenas admin tem acesso

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
  "contacts": [
    {
      "id": 2,
      "name": "jaque",
      "email": "user@dmin.com.br",
      "telephone": "123",
      "createdAt": "2024-01-31",
      "deletedAt": null,
      "clientId": 1
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro    | Descrição               |
| ----------------- | ----------------------- |
| 401 Unhauthorized | Missing bearer token    |
| 403 Forbidden     | Insufficient permission |

---

### 2.3. **Alterar Contato**

### `/contacts/:contact_id`

### Exemplo de Request:

```
PATCH /contacts/:contact_id
Authorization: Bearer token / Apenas admin e próprio cliente tem acesso
Content-type: application/json

```

### Corpo da Requisição:

Campos são opcionais.

```json
{
  "name": "jaque",
  "email": "123@123.bn",
  "telephone": "123",
  "clientId": 1
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
	{
	"id": 1,
	"name": "jaque",
	"email": "123@123.bn.gg",
	"telephone": "123",
	"createdAt": "2024-01-31",
	"deletedAt": null,
	"clientId": 2
}
}
```

### Possíveis Erros:

| Código do Erro    | Descrição                             |
| ----------------- | ------------------------------------- |
| 404 Not Found     | Contact not found ou Client not found |
| 401 Unhauthorized | Missing bearer token                  |
| 403 Forbidden     | Insufficient permission               |
| 409 Conflict      | Email already exists                  |

---

### 2.4. **Deletar Cliente**

### `/contacts/:contact_id`

### Exemplo de Request:

```
DELETE /contacts/:contact_id
Authorization: Bearer token / Apenas admin e próprio cliente tem acesso
Content-type: application/json

```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 OK
```

```json
Vazio
```

### Possíveis Erros:

| Código do Erro    | Descrição               |
| ----------------- | ----------------------- |
| 404 Not Found     | Contact not found       |
| 401 Unhauthorized | Missing bearer token    |
| 403 Forbidden     | Insufficient permission |

---

## 3. **Login**

### Endpoints

| Método | Rota      | Descrição             |
| ------ | --------- | --------------------- |
| POST   | /contacts | Criação de um contato |

---

### 3.1. **Login**

### `/login`

### Exemplo de Request:

```
POST /login
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "email": "user@dmin.com.br",
  "password": "jaque"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGNvbS5iciIsImFkbWluIjp0cnVlLCJpYXQiOjE3MDY3MzYyOTIsImV4cCI6MTcwNjc0NzA5Miwic3ViIjoiMiJ9.-3g_F47Fcu1JQDL-0ObA0lCeviS-eCtagDz32lewyvE",
  "admin": true,
  "telephone": "123",
  "name": "jaque",
  "email": "admin@com.br"
}
```

### Possíveis Erros:

| Código do Erro    | Descrição                         |
| ----------------- | --------------------------------- |
| 401 Unhauthorized | Invalid email ou Invalid password |
| 400 Bad Request   | Required                          |

---

---

## Contato

Se você tiver dúvidas ou comentários, entre em contato através do e-mail [jaquelinejhirose@gmail.com](mailto:jaquelinejhirose@gmail.com).
