require('ejs');
const express = require('express');
const app = express();
const superagent = require('superagent');
app.use('/public',express.static('public'));
app.set('view engine', 'ejs');

const likeGoogleResultsButForOurBooks = (req,res)=>{
  res.render('./pages/searches/bookSearch');
}

const digitalBookConveyingSystem = (req,res)=>{
  let url = 'https://www.googleapis.com/books/v1/volumes';
  let query = {
    q: `in${req.body.search[1]}:${req.body.search[0]}`
  }
  superagent.get(url)
    .query(query)
    .then(apiData => {
      let retArr = apiData.body.items.map(obj => {
        return new Book(obj.volumeInfo)
      })
      res.render('./pages/searches/showResults', {books: retArr})
    }).catch(err => console.log(err))
}

function Book(obj){
  this.title = obj.title ? obj.title : 'No title available';
  if(!obj.industryIdentifiers){
    this.isbn='No ISBN available';
  }else{
    this.isbn = `${obj.industryIdentifiers[0].type} ${obj.industryIdentifiers[0].identifier}`;
  }
  this.author= obj.authors ? obj.authors : ['No author posted'];
  this.description= obj.description ? obj.description : 'No description available'
  if(obj.imageLinks){
    this.image_url= obj.imageLinks.thumbnail ? obj.imageLinks.thumbnail.replace(/http:/, 'https:') : 'https://i.imgur.com/J5LVHEL.jpg';
  } else{
    this.image_url='https://i.imgur.com/J5LVHEL.jpg';
  }
}
module.exports.likeGoogleResultsButForOurBooks = likeGoogleResultsButForOurBooks;
module.exports.digitalBookConveyingSystem = digitalBookConveyingSystem;

