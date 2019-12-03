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
  var getRsvpYes = "select firstname, lastname, phone, email, numOfGuest, rsvpConfirmed from brishti.invitations where rsvpConfirmed='false'"
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
  var rsvpConfirmed =  req.body.rsvpConfirmed ? req.body.rsvpConfirmed : false;
  
  // var query = "SET SQL_SAFE_UPDATES = 0; \
  // UPDATE brishti.invitations set numOfGuest=" + numOfGuest + ", email='" + email + "', phone='" + phone + "', rsvpConfirmed=" + rsvpConfirmed + " where invitationCode = '"+invitationCode+"'; SET SQL_SAFE_UPDATES = 1;";

  var sql = `UPDATE brishti.invitations
           SET numOfGuest = ?, email = ?, phone = ?, rsvpConfirmed = ?
           WHERE invitationCode = ?;`;
  var data = [numOfGuest, email, phone, rsvpConfirmed, invitationCode];
  con.query(sql, data, function (err, result) {

    if (err){
      // return console.error(error.message);
      throw err
    }
    console.log('Rows affected:', result.affectedRows);
  });
  res.send(req.body);
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    multipleStatements: true
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("DROP DATABASE IF EXISTS brishti;", function (err, result) {
      if (err) throw err;
      console.log("Database Dropped");
    });
    // Create Database
    con.query("CREATE DATABASE IF NOT EXISTS brishti;", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    var sql = "CREATE TABLE IF NOT EXISTS brishti.invitations (id int NOT NULL AUTO_INCREMENT,invitationCode VARCHAR(255), firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, phone VARCHAR(255), email VARCHAR(255), rsvpConfirmed boolean DEFAULT false, numOfGuest int, PRIMARY KEY (id))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

    // // Create Database
    // con.query("SET SQL_SAFE_UPDATES = 0;", function (err, result) {
    //   if (err) throw err;
    //   console.log("Setting Query Safe Mode to false so we can update without using Key column");
    // });

    var query = "INSERT INTO brishti.invitations (firstname, lastname, phone, email, numOfGuest, invitationCode) VALUES ('parth', 'patel', '647-530-1172', 'parth17elec@gmail.com', 2, '123456');";
    con.query(query, function (err, result) {
      if (err) throw err;
      console.log("Raw inserted into the table");
    });    
  });

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});