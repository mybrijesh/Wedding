var express = require('express');
var mysql = require('mysql');



var app = express();

var PORT = 3000;

app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});