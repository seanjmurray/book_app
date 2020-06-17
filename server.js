'use strict';
require('dotenv').config();
require('ejs');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080;
const home = require('./libs/home');
const librarian = require('./libs/librarian');
const shelf = require('./libs/deweyDecimaler');
const search = require('./libs/search');
const update = require('./libs/update');
const author = require('./libs/author');
const error = require('./libs/error');
app.use('/public',express.static('public'));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));

app.route('/')
  .get(home.getHome)
app.route('/books/:id')
  .get(librarian.bookView)
app.route('/books')
  .post(shelf.storeBook);
app.route('/searches/new')
  .get(search.likeGoogleResultsButForOurBooks)
app.route('/searches')
  .post(search.digitalBookConveyingSystem)
app.route('/author')
  .get(author.getAuthor)
app.route('/update/:id')
  .put(update.rewriteHistory)
  .delete(update.burnBook)
app.use('*',error.notFound)
app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));

