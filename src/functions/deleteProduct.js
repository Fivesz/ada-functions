const { app } = require("@azure/functions");
const { getPool, sql } = require("../shared/db");

app.http("Delete", {
  methods: ["DELETE"],
  route: "products/{id}",
  authLevel: "anonymous",
  handler: async (req, ctx) => {
    const id = parseInt(req.params.id);
    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Produto OUTPUT DELETED.id WHERE id = @id");

    if (!result.recordset.length)
      return { status: 404, jsonBody: { message: "Produto não encontrado" } };

    return { status: 204 };
  },
});
