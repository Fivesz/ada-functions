const { app } = require("@azure/functions");
const { getPool, sql } = require("../shared/db");

app.http("Update", {
  methods: ["PUT"],
  route: "products/{id}",
  authLevel: "anonymous",
  handler: async (req, ctx) => {
    const id = parseInt(req.params.id);
    const { nome_produto } = await req.json();

    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("nome", sql.VarChar(50), nome_produto)
      .query(
        "UPDATE Produto SET nome_produto = @nome OUTPUT INSERTED.* WHERE id = @id",
      );

    if (!result.recordset.length)
      return { status: 404, jsonBody: { message: "Produto não encontrado" } };

    return { jsonBody: result.recordset[0] };
  },
});
