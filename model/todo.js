const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Todo = mongoose.model('Todo', todoSchema, 'todos');

exports.Todo = Todo;