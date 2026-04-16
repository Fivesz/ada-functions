# Ada Functions API

API REST desenvolvida com Azure Functions e Node.js para gerenciamento de produtos, com persistência em Azure SQL Database.

## Tecnologias

- Azure Functions (Node.js 24)
- Azure SQL Database
- mssql (driver de conexão)
- JavaScript

## Endpoints

Base URL: `https://adafunctionapp-arata8aveae2ezh5.brazilsouth-01.azurewebsites.net/api`

| Método | Rota             | Descrição               |
| ------ | ---------------- | ----------------------- |
| GET    | `/products`      | Lista todos os produtos |
| GET    | `/products/{id}` | Busca produto por ID    |
| POST   | `/products`      | Cria um novo produto    |
| PUT    | `/products/{id}` | Atualiza um produto     |
| DELETE | `/products/{id}` | Remove um produto       |

## Exemplos de uso

### Criar produto

```http
POST /api/products
Content-Type: application/json

{
  "nome_produto": "Notebook Dell XPS"
}
```

### Atualizar produto

```http
PUT /api/products/1
Content-Type: application/json

{
  "nome_produto": "Notebook Dell XPS 15"
}
```

## Estrutura do projeto
