const { app } = require("@azure/functions");
const { getPool, sql } = require("../shared/db");

app.http("GetById", {
  methods: ["GET"],
  route: "products/{id}",
  authLevel: "anonymous",
  handler: async (req, ctx) => {
    const id = parseInt(req.params.id);
    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Produto WHERE id = @id");

    if (!result.recordset.length)
      return { status: 404, jsonBody: { message: "Produto não encontrado" } };

    return { jsonBody: result.recordset[0] };
  },
});
