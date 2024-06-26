const mongoose = require('mongoose');
const { boolean } = require('zod');
//mongoDB connection
mongoose.connect('mongodb+srv://...@cluster0.7vmqawp.mongodb.net/todos')


//Schema
const todoSchema = new mongoose.Schema({
    title : String,
    description : String, 
    completed : Boolean
})

//Model
const todo = mongoose.model('todo', todoSchema);

module.exports = todo