var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
// https://malcoded.com/posts/angular-backend-express/
var app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/json
app.use(bodyParser.json());

var PORT = 8000;

app.route('/').get((req, res) => {
  res.status(200).send('Hello world');
})

app.route('/getInvitationDetail').get((req, res) => {
  var invitationCode = req.query.invitationCode;
  console.log(invitationCode);
  var query = `select firstname, lastname, phone, email, numOfGuest, id from brishti.invitations where invitationCode=?`
  var data = [invitationCode];
  con.query(query, data, function (err, result) {
    if (err) {
      console.log("/confirmrsvp");
        console.error("sql: " + sql);
        console.error("data: " + data);
      // throw err;
    }
    // console.log(result[0]);
    // var d = {firstname: result[0].firstname, email: result[0].email,
    //   lastname: result[0].lastname, numOfGuest: result[0].numOfGuest,
    //   phone: result[0].phone, id: result[0].id}
    res.status(200).send(result[0]);
  });
})

app.route('/confirmrsvp').post((req, res) => {
  console.log(req.body);      // your JSON
  var email = req.body.email ? req.body.email : "";  // second parameter is default
  var phone = req.body.phone ? req.body.phone : "";
  var numOfGuest = req.body.numOfGuest ? req.body.numOfGuest : "";
  var invitationCode = req.body.invitationCode ? req.body.invitationCode : "";
  var rsvpConfirmed =  req.body.rsvpConfirmed ? req.body.rsvpConfirmed : false;
    
  var sql = `UPDATE brishti.invitations
           SET numOfGuest = ?, email = ?, phone = ?, rsvpConfirmed = ?
           WHERE invitationCode = ?;`;
  var data = [numOfGuest, email, phone, rsvpConfirmed, invitationCode];
  con.query(sql, data, function (err, result) {

    if (err){
      console.log("/confirmrsvp");
      console.error("sql: " + sql);
      console.error("data: " + data);
      res.send(false);
      // throw err
    }
    res.send(true);
  });
})

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

    var query = "INSERT INTO brishti.invitations (firstname, lastname, phone, email, numOfGuest, invitationCode) VALUES ('parth', 'patel', '647-530-1172', 'parth17elec@gmail.com', 2, 'abc123');";
    con.query(query, function (err, result) {
      if (err) throw err;
      console.log("Raw inserted into the table");
    });    
  });

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});


// const XLSX = require('xlsx');
// const workbook = XLSX.readFile('Ridham.xlsx');
// const sheet_name_list = workbook.SheetNames;
// console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))