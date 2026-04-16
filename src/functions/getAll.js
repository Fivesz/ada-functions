const { app } = require("@azure/functions");
const { getPool, sql } = require("../shared/db");

app.http("GetAll", {
  methods: ["GET"],
  route: "products",
  authLevel: "anonymous",
  handler: async (req, ctx) => {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Produto");
    return { jsonBody: result.recordset };
  },
});
