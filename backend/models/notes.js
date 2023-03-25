const mongoose = require('mongoose');


const notesSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  id:{
    type:String,
    required:true
  }
},{timestamps:true})



const notesModel = mongoose.model('Notes',notesSchema)


module.exports = notesModel