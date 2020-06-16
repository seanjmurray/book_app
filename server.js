'use strict';
require('dotenv').config();
require('ejs');
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
const PORT = process.env.PORT || 8080;
app.use('/public',express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));
const home = require('./libs/home');

app.get('/', home.getHome)


app.route('/searches/new')
  .get((req,res)=>{
    res.render('./pages/searches/bookSearch');
  })
app.route('/searches')
  .post((req,res)=>{
    let url = 'https://www.googleapis.com/books/v1/volumes';
    let query = {
      q: `in${req.body.search[1]}:${req.body.search[0]}`
    }
    superagent.get(url)
      .query(query)
      .then(apiData => {
        let retArr = apiData.body.items.map(obj => {
          console.log('I didn\'t break it',obj)
          return new Book(obj.volumeInfo)
        })
        res.render('./pages/searches/showResults', {bookArr: retArr})
      }).catch(err => console.log(err))
  })

app.use('*',(req,res)=>{
  res.render('./pages/error')
})

function Book(obj){
  this.title = obj.title ? obj.title : 'No title available';
  this.author= obj.authors ? obj.authors : ['No author posted'];
  this.description= obj.description ? obj.description : 'No description available'
  if(obj.imageLinks){
    this.img= obj.imageLinks.thumbnail ? obj.imageLinks.thumbnail.replace(/http:/, 'https:') : 'https://i.imgur.com/J5LVHEL.jpg';
  } else{
    this.img='https://i.imgur.com/J5LVHEL.jpg';
  }
}



app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));

