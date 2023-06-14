
# Desafio-FullStack-backend

## 1 - Sobre

A API de cadastro de usários e contatos é um sistema que permite criar, consultar, atualizar e excluir informações de clientes e seus contatos. Os clientes são registrados com dados como nome completo, e-mail, telefone e data de registro. Os contatos, vinculados aos clientes, também possuem informações como nome completo, e-mail, telefone e data de registro.

---

## 2 - Tecnologias

tecnologias utilizadas no projeto:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/?id=table-of-contents)
- [Bcryptjs](https://www.npmjs.com/package/bcrypt)

A URL base da aplicação:
https://fullstack-backend-nwtf.onrender.com/
---

## 3 - Diagrama

Diagrama da API definindo as relações entre as tabelas do banco de dados.

(![diagrama-desafio-fullstack](https://github.com/imgabrie1/desafio-fullstack-backend/assets/107321330/80116c78-0f36-4a1f-a02f-9bb34ee61b85))

---

## 4 - Instalação e uso

### Requisitos:
- [NodeJS](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com) ou [yarn](https://yarnpkg.com)
- Banco de dados [PostgreSQL](https://www.postgresql.org)

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
npm install
```

ou

```shell
yarn install
```

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
env.example -> .env
```
Configure as variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

Execute as migrations com o comando:

```
npx typeorm migration:run -c src/data-source.ts
```

ou

```
yarn typeorm migration:run -d src/data-source.ts
```

Para rodar o servidor localmente:

```
npm run dev
```

ou

```
yarn dev
```

---

## 5 - Endpoints

| Método   | Rota         | Descrição                                 |
|----------|--------------|-------------------------------------------|
| POST     | /users       | Criação de um usuário.                    |
| PATCH    | /users/id    | Edita o usuário.                          |
| DELETE   | /users/id    | Deleta o usuário.                         |
| GET      | /users/id    | Retorna usário pelo ID.                   |
| POST     | /login       | Retorna o token.                          |
| POST     | /contacts    | Cria um contato para o usuário.           |
| GET      | /contacts    | Lista todos os contatos do usuário.       |
| GET      | /contacts/id | Retorna o contato específico do usuário.  |
| PATCH    | /contacts/id | Edita o contato específico do usuário.    |
| DELETE   | /contacts/id | Deleta o contato específico do usuário.   |

---

#### As requisições podem ser testadas em programas como o [Insomnia](https://insomnia.rest/download), por exemplo.

---

### CREATE CLIENT

### `/users`

#### Não é necessário autenticação
#### Todos os campos são obrigatórios

- name - STRING, LENGTH(50)
- email - STRING, EMAIL, LENGTH(50)
- password - STRING, LENGTH(20)
- phone - STRING, LENGTH(11)

### Retorno esperado
**STATUS 201**

```json
{
	"id": 1,
	"name": "Gabriel",
	"email": "gabriel@gmail.com",
	"phone": "27925555574",
	"createdAt": "2023-06-14"
 }
```
---

### LOGIN

### `/login`

### Não é necessário autenticação
### Todos os campos são obrigatórios

- email - STRING
- password - STRING

### Retorno esperado
**STATUS 200**

```json
 {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTY4NTkzNzUyOSwiZXhwIjoxNjg2MDIzOTI5LCJzdWIiOiIxOCJ9.TzNJldwMCyADGsbUv3dROUaGsVMtx8KKHY3yA-JG7fw"
 }
 ```
 ---

 ### EDIT CLIENT

 ### `/users/id`

 ### É necessário autenticação
### Campos opcionais

-  name: STRING, LENGTH(50)
-  email: STRING, LENGTH(50)
-  password: STRING, LENGTH(20)
-  phone - STRING, LENGTH(11)

### Retorno esperado
**STATUS 200**

```json
{
	"id": 1,
	"name": "Gabriel Andrade",
	"email": "gabrielandrade@gmail.com",
	"phone": "51993453672",
	"createdAt": "2023-06-14"
}
```
---

### DELETE CLIENT

### `/users/id`

### É necessário autenticação

### Retorno esperado
**STATUS 204**

---

### CREATE CONTACT

### `/contacts`

### É necessário autenticação
### Campos obrigatórios

- name - STRING, LENGTH(50)
- email - STRING, EMAIL, LENGTH(50)
- phone - STRING, LENGTH(11)

### Retorno esperado
**STATUS 201**

```json
{
	"id": 1,
	"full_name": "contato um",
	"email": "contato@gmail.com",
	"phone": "12345678900",
	"createdAt": "2023-06-14"
	"client": {
		"id": 1,
		"name": "Usuário",
		"email": "usuario@gmail.com",
		"phone": "00987654321",
		"createdAt": "2023-06-14"
   }
}
```

---

### LIST CONTACTS

### `/contacts`

### É necessário autenticação

### Retorno esperado
**STATUS 200**

```json

	{
		"id": 2,
		"name": "contato dois",
		"email": "contato2@gmail.com",
		"phone": "12345098766",
		"createdAt": "2023-06-14"
	},
	{
		"id": 3,
		"name": "contato 3",
		"email": "contato3@gmail.com",
		"phone": "62823871395",
		"createdAt": "2023-06-14"
	}
  ```
  ---

### LIST CONTACT PER ID

### `/contacts/id`

### É necessário autenticação
Retorna um único contato do usuário passado na URL
### Retorno esperado



**STATUS 200**

```json
{
	"id": 1,
	"full_name": "contato",
	"email": "contato1@gmail.com",
	"phone": "18737269236",
	"createdAt": "2023-06-14"
	"client": {
		"id": 1,
		"name": "Usuário",
		"email": "usuario@gmail.com",
		"phone": "14237923327",
		"createdAt": "2023-06-01"
   }
}
```
---

### EDIT CONTACT PER ID

### `/contacts/id`

### É necessário autenticação
Atualiza o contato passado na URL

### Campos opcionais
-  name: STRING, LENGTH(50)
-  email: STRING, LENGTH(50)
-  phone - STRING, LENGTH(11)

### Retorno esperado
**STATUS 200**
```json
{
	"id": 1,
	"full_name": "contato um",
	"email": "contato@gmail.com",
	"phone": "19634294233",
  	"createdAt": "2023-06-14"
	"client": {
		"id": 1,
		"name": "Usuário",
		"email": "usuario@gmail.com",
		"phone": "74529734931",
		"createdAt": "2023-06-14"
   }
}
  ```
  ---

  ### DELETE CONTACT PER ID

  ### `/contacts/id`

  ### É necessário autenticação
Deleta o contato passado na URL

### Retorno esperado
**STATUS 204**




