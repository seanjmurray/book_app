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


const rewriteHistory = (req,res) => {
  let {author, title, isbn, image_url, description, bookshelf} = req.body
  let sql = 'UPDATE books SET author = $1, title = $2, isbn = $3, image_url = $4, description = $5, bookshelf = $6 WHERE id = $7;';
  let safe = [author, title, isbn, image_url, description, bookshelf, req.params.id];
  client.query(sql,safe)
    .then(()=>{
      res.redirect(`/books/${req.params.id}`);
    }).catch(err => console.log(err))
}
const burnBook = (req,res) => {
  let sql = 'DELETE FROM books WHERE id=$1';
  let safe = [req.params.id];
  client.query(sql,safe)
    .then(()=>{
      res.redirect('/');
    }).catch(err => console.log(err))
}
module.exports.rewriteHistory = rewriteHistory;
module.exports.burnBook = burnBook;
