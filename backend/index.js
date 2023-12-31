const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "bookstoredb.cjoke4ysvsvr.eu-north-1.rds.amazonaws.com",
  user: "admin",
  port: "3306",
  password: "mypassword",
  database: "bookstoreschema",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database successfully!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM bookstore";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing the query:", err);
      return res.status(500).json({
        error: true,
        message: `Error in getting books: ${err.message}`,
      });
    }
    console.log("Query executed successfully.");
    return res.json({
      books: data,
    });
  });
});

app.post("/books", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const cover = req.body.cover;

  if (!title) {
    return res.json({
      message: "Title must be provided",
    });
  }
  if (!description) {
    return res.json({
      message: "description must be provided",
    });
  }
  const q =
    "INSERT INTO bookstore (`title`, `description`, `cover`) VALUES (?, ?, ?)";
  const values = [title, description, cover];

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
  const description = req.body.description;
  const cover = req.body.cover;
  let q = "UPDATE bookstore SET ";
  const values = {
    title,
    description,
    cover,
  };
  console.log(values, "values");
  if (title) {
    q += ` title = ${JSON.stringify(title)},`;
  }
  if (description) {
    q += ` description = ${JSON.stringify(description)},`;
  }
  if (cover) {
    q += ` cover = ${JSON.stringify(cover)},`;
  }

  q = q.slice(0, -1);
  q = q + ` WHERE ID = ${bookId}`;
  db.query(q, (err, data) => {
    console.log("updatedquery: " + q);
    if (err)
      return res.json({
        error: true,
        message: `Invalid request check the request body or bookId: ${err}`,
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
    if (description) {
      return res.json({
        error: false,
        message: "Book description updated",
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
    if (data.affectedRows === 0) {
      return res.json({
        error: true,
        message: `Book with ID ${bookId} not found.`,
      });
    }
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
