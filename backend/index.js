const express = require("express");
const app = express();
const mysql = require("mysql2");

require("dotenv").config();

const PORT = process.env.PORT;

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  password: "r@kesh r@kesh99",
  database: "curdschema",
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM bookstore";
  db.query(q, (err, data) => {
    console.log("SQL connected");
    if (err) {
      return res.json(err);
    }
    return res.json(data)
  });
});

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
