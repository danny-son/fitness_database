

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post("/connect-database", (req,res) => {
  const user = req.body.username;
  const password = req.body.password;
  let connection = mysql.createConnection({
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

app.listen(3001, () => {
  console.log("running server");
});








