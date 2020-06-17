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

const getAuthor = (req,res) => {
  let sql = 'SELECT * FROM books WHERE lower(author) LIKE $1;';
  let safe = [req.query.author.toLowerCase()];
  client.query(sql,safe)
    .then(dbData => {
      if(dbData.rowCount){
        res.render('pages/author', {books: dbData.rows})
      }else{
        res.redirect('/searches/new');
      }
    }).catch(err => console.log(err))
}


module.exports.getAuthor = getAuthor;
