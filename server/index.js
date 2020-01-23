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
  var query = `select firstname, lastname, phone, email, numOfGuest, id, rsvpConfirmed from brishti.invitations where invitationCode=?`
  var data = [invitationCode];
  con.query(query, data, function (err, result) {
    if (err) {
      console.log("/getInvitationDetail");
        console.error("sql: " + sql);
        console.error("data: " + data);
      // throw err;
    }
    if(result.length == 0){
      res.status(200).send(undefined);
    }
    else {
      res.status(200).send(result[0]);
    }
  });
})

app.route('/confirmrsvp').post((req, res) => {
  // console.log(req.body);      // your JSON
  var email = req.body.email ? req.body.email : "";  // second parameter is default
  var phone = req.body.phone ? req.body.phone : "";
  var numOfGuest = req.body.numOfGuest ? req.body.numOfGuest : "";
  var invitationCode = req.body.invitationCode ? req.body.invitationCode : "";
  var rsvpConfirmed =  req.body.rsvpConfirmed ? req.body.rsvpConfirmed : false;
    
  var sql = `UPDATE brishti.invitations
           SET confirmedGuest = ?, email = ?, phone = ?, rsvpConfirmed = ?
           WHERE invitationCode = ?;`;
  var data = [numOfGuest, email, phone, rsvpConfirmed, invitationCode];
  con.query(sql, data, function (err, result) {
    // let done = true;
    if (err){
      console.log("/confirmrsvp");
      console.error("sql: " + sql);
      console.error("data: " + data);
      console.error("err: "+ err);
      res.status(200).send(false);
      // done = false;
    }
    // response.writeHead(413, {'Content-Type': 'text/plain'}).end();
    //             request.connection.destroy();
    res.status(200).send(true);
    // res.status(200).json({ status: done });
  });
})

var con = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "password",
    // multipleStatements: true
    host: "weddingrsvp.cuguk9cbft4p.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "",
    port: 3306,
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

    var sql = "CREATE TABLE IF NOT EXISTS brishti.invitations (\
      id int NOT NULL AUTO_INCREMENT,\
      invitationCode VARCHAR(255), \
    firstname VARCHAR(255) NOT NULL, \
    lastname VARCHAR(255) NOT NULL, \
    phone VARCHAR(255), \
    email VARCHAR(255), \
    rsvpConfirmed boolean DEFAULT false, \
    numOfGuest int DEFAULT 0, \
    confirmedGuest int DEFAULT 0, \
    PRIMARY KEY (id))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

    // // Create Database
    // con.query("SET SQL_SAFE_UPDATES = 0;", function (err, result) {
    //   if (err) throw err;
    //   console.log("Setting Query Safe Mode to false so we can update without using Key column");
    // });

    var query = "INSERT INTO brishti.invitations (firstname, lastname, phone, email, numOfGuest, invitationCode) VALUES ('brijesh', 'patel', '9174966106', 'mybrijesh@gmail.com', 2, 'brij123');";
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