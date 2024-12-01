const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json()); // JSONリクエストを処理するために必要
app.use(cors()); // CORSを有効にする

const client = new Client({
  user: "gourmeguri",
  host: "localhost",
  database: "vuetestDB",
  password: "Riben731_",
  port: 5432,
});

client.connect();

app.get("/data", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM user_table");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error querying the database");
  }
});

app.post("/insert", async (req, res) => {
  const { email, passWd, name } = req.body;

  if (!email || !passWd || !name) {
    return res
      .status(400)
      .json({ error: "Name and Email and password are required" });
  }

  try {
    const result = await client.query(
      "INSERT INTO user_table (mailaddress,password,hundlename) VALUES ($1,$2,$3) RETURNING *",
      [email, passWd, name]
    );
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error querying the database");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
