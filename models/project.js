'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var ProjectSchema= Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  lang: String,
  image: String
});

module.exports=mongoose.model('Project', ProjectSchema);
//projects --> guarda los documentos en la coleccion. Los pluraliza acordate!
