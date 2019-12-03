var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')

var app = express()

// parse application/json
app.use(bodyParser.json())

var PORT = 3000;

app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});

app.get('/rsvp', function(req, res) {
  var getRsvpYes = "select firstname, lastname, phone, email, numOfGuest from brishti.invitations where rsvp='false'"
  con.query(getRsvpYes, function (err, result) {
    if (err) throw err;
    console.log("get all record where rsvp is no");
    res.status(200).send(result[0].firstname);

  });
});


app.post('/confirmrsvp', function(req, res) {
  console.log(req.body);      // your JSON
  var email = req.body.email ? req.body.email : "";  // second parameter is default
  var phone = req.body.phone ? req.body.phone : "";
  var numOfGuest = req.body.numOfGuest ? req.body.numOfGuest : "";
  var invitationCode = req.body.invitationCode ? req.body.invitationCode : "";
  res.send(invitationCode);
  // var query = "UPDATE brishti.invitations set numOfGuest=req.body.numOfGuest, \
  //                set rsvp = req.query.rsvp;";
  // con.query(query, function (err, result) {
  //   if (err) throw err;
  //   console.log("Raw inserted into the table");
  // });
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // Create Database
    con.query("CREATE DATABASE IF NOT EXISTS brishti", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    var sql = "CREATE TABLE IF NOT EXISTS brishti.invitations (id int NOT NULL AUTO_INCREMENT, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, phone VARCHAR(255), email VARCHAR(255), rsvp boolean DEFAULT false, numOfGuest int, PRIMARY KEY (id))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

    // var query = "INSERT INTO brishti.invitations (firstname, lastname, phone, email, numOfGuest) VALUES ('parth', 'patel', '647-530-1172', 'parth17elec@gmail.com', 2);";
    // con.query(query, function (err, result) {
    //   if (err) throw err;
    //   console.log("Raw inserted into the table");
    // });

    
  });

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});