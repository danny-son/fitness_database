

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const e = require('express');

let connection = null;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/connect-database", (req,res) => {
  const user = req.body.username;
  const password = req.body.password;
  connection = mysql.createConnection({
    host: 'localhost',
    user: user,
    password: password,
    database: 'fitness_db'
  });

  connection.connect(function(err) {
    if (err) {
      console.log('Could not connect, enter correct username and password!');
      res.status(404).send("Failure");
    } else {
      console.log('Connected to the MySQL server.');
      res.status(200).send("Success");
    }
  });
});

app.get("/check-user-exists", (req,res) => {
  const user = req.query.username;
  let sql = `CALL userExists(\"${user}\")`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.log(error.message);
    } else {
      let numtuples = JSON.parse(JSON.stringify(results[0].length));
      if (numtuples == 0) {
        res.status(200).send("Success");
      } else {
        res.status(401).send("User Already Exists!");
      }
    }
  });
});

app.post("/register-user", (req,res) => {
  const user = req.body.username;
  const password = req.body.password;
  const date = new Date().toJSON().slice(0,10);
  let sql = `CALL insertUser(\"${user}\", \"${password}\",\"${date}\")`;
  connection.query(sql, (error) => {
    if (error) {
      console.log(error.message);
    } else {
      res.status(200).send("Created Account Successfully!");
    }
  });
});

app.get("/login-user", (req,res) => {
  const user = req.query.username;
  const pass = req.query.password;
  let sql = `SELECT loginUser(\"${user}\", \"${pass}\") AS output`;
  connection.query(sql, (error, results, fields) => {
     let output = JSON.parse(JSON.stringify(results[0].output));
     if (output == 1) {
       res.status(200).send("Login succesful");
     } else {
       res.status(401).send("account not found");
     }
  });
});

app.listen(3001, () => {
  console.log("running server");
});








