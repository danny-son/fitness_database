
const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

app.post("/connect-database", (req,res) => {
  const user = req.body.user;
  const password = req.body.password;
  let connection = mysql.createConnection({
    host: 'localhost',
    user: user,
    password: password,
    database: 'fitness_db'
  });

  connection.connect(function(err) {
    if (err) {
      console.log('Could not connect, error!')
    }

  console.log('Connected to the MySQL server.');
  });

});

app.listen(3001, () => {
  console.log("running server");
});








