require('dotenv').config();
require('ejs');
const express = require('express');
const app = express();
const pg = require('pg');
const DB = process.env.DATABASE_URL;
app.use('/public',express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));
const client = new pg.Client(DB)
client.on('error', err => console.log(err));
client.connect();



const getHome = (req,res) => {
  let sql = 'SELECT * FROM books;';
  client.query(sql)
    .then(dbData =>{
      res.render('pages/index', {books: dbData.rows});
    }).catch(err => console.log(err));
}

module.exports.getHome = getHome;
