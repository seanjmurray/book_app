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


const storeBook = (req,res) => {
  let {author, title, isbn, description, image_url, bookshelf} = req.body;
  let sql = 'SELECT id,isbn FROM books WHERE isbn=($1);';
  let safe = [isbn]
  client.query(sql,safe)
    .then(dbData =>{
      if(dbData.rowCount === 0){
        let sql = 'INSERT INTO books (author, title, isbn, image_url, description, bookshelf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
        let safe = [author, title, isbn, image_url, description, bookshelf];
        client.query(sql, safe)
          .then(dbData =>{
            res.redirect(`/books/${dbData.rows[0].id}`);
          }).catch(err=>console.log(err));
      }else{
        res.redirect(`/books/${dbData.rows[0].id}`);
      }
    }).catch(err=> console.log(err));
}
module.exports.storeBook = storeBook;
