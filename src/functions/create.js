const { app } = require("@azure/functions");
const { getPool, sql } = require("../shared/db");

app.http("Create", {
  methods: ["POST"],
  route: "products",
  authLevel: "anonymous",
  handler: async (req, ctx) => {
    const { nome_produto } = await req.json();
    if (!nome_produto)
      return {
        status: 400,
        jsonBody: { message: "nome_produto é obrigatório" },
      };

    const pool = await getPool();
    const result = await pool
      .request()
      .input("nome", sql.VarChar(50), nome_produto)
      .query(
        "INSERT INTO Produto (nome_produto) OUTPUT INSERTED.* VALUES (@nome)",
      );

    return { status: 201, jsonBody: result.recordset[0] };
  },
});
