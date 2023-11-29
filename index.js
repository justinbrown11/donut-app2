const express = require('express');
const mysql = require('mysql2');
const cors =  require('cors');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors("*"));

const db = mysql.createConnection({
  host: "container-lab-db.cu1tn9kqglty.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "donuts_db",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the MySQL database");
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM donuts";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.render('index', { donuts: result });
    });
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});