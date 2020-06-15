'use strict';
require('dotenv').config();
require('ejs');
const express = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));


app.get('/', (req,res) => {
  res.render('index');
})



app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));

