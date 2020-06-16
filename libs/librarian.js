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

const bookView = (req,res) => {
  let sql = 'SELECT * FROM books WHERE id=($1);';
  let safe = [req.params.id]
  client.query(sql,safe)
    .then(dbData => {
      res.render('pages/books/show', {book: dbData.rows[0]});
    }).catch(err=> console.log(err))
}

module.exports.bookView = bookView;
