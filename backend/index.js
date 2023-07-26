const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

require("dotenv").config();

const PORT = process.env.PORT;

app.use(bodyParser.json());

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
      return res.json({
        error: true,
        message: `Error in getting books ${err}`,
      });
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const cover = req.body.cover;

  if (!title) {
    return res.json({
      message: "Title must be provided",
    });
  }
  if (!desc) {
    return res.json({
      message: "Desc must be provided",
    });
  }
  const q = "INSERT INTO bookstore (`title`, `desc`, `cover`) VALUES (?, ?, ?)";
  const values = [title, desc, cover];

  db.query(q, values, (err, data) => {
    if (err)
      return res.json({
        error: true,
        message: `error in post books ${err}`,
      });
    return res.json({
      error: false,
      message: "Books stored successfully",
      data: data,
    });
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const title = req.body.title;
  const desc = req.body.desc;
  const cover = req.body.cover;
  let q = "UPDATE bookstore SET";
  const values = [];
  if (title) {
    q += ` title = ${JSON.stringify(title)} WHERE id = ${bookId} `;
  }
  if (desc) {
    q += ` desc = ${JSON.stringify(desc)} WHERE id = ${bookId} `;
  }
  if (cover) {
    q += ` cover = ${JSON.stringify(cover)} WHERE id = ${bookId} `;
  }

  db.query(q, (err, data) => {
    console.log("updatedquery: " + q);
    if (err)
      return res.json({
        error: true,
        message: `Invalid request check the request body or bookId`,
      });

    if (data.affectedRows === 0) {
      return res.json({
        error: true,
        message: `Book with ID ${bookId} not found.`,
      });
    }

    if (title) {
      return res.json({
        error: false,
        message: "Book title updated",
        data: data,
      });
    }
    if (desc) {
      return res.json({
        error: false,
        message: "Book desc updated",
        data: data,
      });
    }
    if (cover) {
      return res.json({
        error: false,
        message: "Book cover updated",
        data: data,
      });
    }
    return res.json({
      error: true,
      message: "Not updated need to provide any value",
    });
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  let q = `DELETE FROM bookstore where ID=${bookId}`;
  console.log("bookId: " + bookId);
  db.query(q, (err, data) => {
    if (err) return res.json({ error: true, message: err });
    console.log("deleted successfully");
    return res.json({
      error: false,
      message: "Deleted successfully",
      data: data,
    });
  });
});

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
