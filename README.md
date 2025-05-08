# 📦 Integração com API de CEP

## 📋 Objetivo

- Consulta de CEPs
- Armazenamento em banco de dados
- Edição de dados
- Favoritação de CEPs

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize**
- **MySQL**
- **Docker**
- **TypeScript** ✅ Base principal da aplicação, todos os arquivos são escritos em `.ts`
- **Jest + Supertest (para testes)**

---

> ℹ️ Como a aplicação é escrita em TypeScript, é necessário compilar os arquivos com `npm run build` antes de rodar.

## 🧰 Pré-requisitos

- [Node.js]
- [Docker]
- [Git]

---

## ⚙️ Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/JeffersonMeira99/cep-api.git
cd cep-api
```

### 2. Crie um arquivo `.env`

```env
MYSQL_HOST=127.0.0.1
MYSQL_USER=bd-user-cep
MYSQL_PASSWORD=cep1234
MYSQL_DATABASE=bd_cep
MYSQL_PORT=3307
PORT=3003
```

### 3. Suba os containers com Docker Compose

```bash
docker-compose up --build
```

### 4. Instalar dependências e iniciar o servidor

```terminal
npm install
npm run build  # ℹ️ Como a aplicação é escrita em TypeScript, é necessário compilar os arquivos com `npm run build` para gerar a pasta `dist` antes de rodar.
npm run dev
```

O backend estará disponível em `http://localhost:3003`.

## 🗃️ Scripts Úteis

| Comando         | Descrição                                          |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Inicia o servidor em ambiente de desenvolvimento   |
| `npm run build` | Compila os arquivos TypeScript para a pasta `dist` |
| `npm run test`  | Executa os testes automatizados com Jest           |

---

## 🔁 Sincronizar dados da API ViaCEP

```bash
GET http://localhost:3003/api/sync
```

Essa rota busca os dados de `https://viacep.com.br/ws/RS/Porto%20Alegre/Domingos/json/` e salva no banco.

---

## 📡 Endpoints Disponíveis

| Método | Rota                      | Descrição                           |
| ------ | ------------------------- | ----------------------------------- |
| GET    | `/api/sync`               | Sincroniza dados da API ViaCEP      |
| GET    | `/api/ceps`               | Lista todos os CEPs cadastrados     |
| GET    | `/api/ceps/:cep`          | Busca um CEP específico             |
| PUT    | `/api/ceps/:cep`          | Atualiza `logradouro` e/ou `bairro` |
| PATCH  | `/api/ceps/:cep/favorito` | Marca ou desmarca como favorito     |

---

## 📌 Exemplo de Requisição `GET /api/ceps/:cep`

```bash
GET:ID http://localhost:3003/api/ceps/91910-450'
```

## 📌 Exemplo de Requisição `PUT /api/ceps/:cep`

```bash
PUT http://localhost:3003/api/ceps/91910-450 Body > raw > JSON '
{
  "logradouro": "Rua das Acácias",
  "bairro": "Jardim das Flores"
}
'
```

## 📌 Exemplo de Requisição `PATCH /api/ceps/:cep/favorito`

```bash
PATCH http://localhost:3003/api/ceps/91910-450/favorito  Body >  raw > JSON '
{
  "favorito": true
}
'
```

---

## 🧪 Testes

```bash
npm run test
```

---

## 🐳 Comandos Docker Úteis

```bash
# Subir containers
docker-compose up --build

# Parar containers
docker-compose down

```

---
