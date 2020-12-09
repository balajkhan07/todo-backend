const express = require('express');
const app = express();
const port = 3000;
const { mongoose } = require('./db');
const { Todo } = require('./model/todo.js');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-reqed-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(express.json({ limit: '50mb' }));

app.listen(port, () => {
    console.log('Listening on port 3000');
})

app.get('/', async (req, res) => {
    console.log('///');
})

app.get('/get-todos', async (req, res) => {
    const todos = await Todo.find();
    if (todos) return res.send(todos);

    return res.status(400).send('Currently no barters ...');
})

app.post('/post-todo', async (req, res) => {
    let todo = new Todo(req.body);
    const result = await todo.save()
    if (result) return res.send(result);
    return res.status(400).send('Unable to save ...');
})

app.put('/put-todo', async (req, res) => {
    let todo = new Todo.findOneAndUpdate(req.body);
    const result = await todo.save();
    if (result) return res.send(result);
    return res.status(400).send('Unable to update ...');
})

app.delete('/delete-todo/:id', async (req, res) => {
    let result = Todo.deleteOne({ _id: req.params.id });
    if (result) return res.send('Deleted successfully..');
    return res.status(400).send('Unable to delete ...');
})