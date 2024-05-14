const express = require("express");
const todoRouter = express.Router();
todoRouter.use (express.json());
todoRouter.use(express.urlencoded({ extended: true }));
const { getTodos, createTodo,updateTodo,deleteTodo } = require('../controllers/todosController.js');

todoRouter.route("/")
.get(async (req, res) => {
    const id = req.query.user_id;
    const todos = await getTodos(id);
    res.send(todos);
})
.post(async (req, res) => {
        const todo = await createTodo(req.body.user_id,req.body.title,req.body.completed);
        res.send(todo);
})

todoRouter
    .route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        const todos = await getTodos(id);
        res.send(todos);
    })
    .put(async(req, res) => {
        const id = req.params.id;
        const todo = await updateTodo(id,req.body.user_id,req.body.title,req.body.completed);
        res.send(todo);
    })
    .delete(async(req, res) => {
        const id = req.params.id;
        const todo = await deleteTodo(id);
        res.send(todo);
    })

module.exports = todoRouter;