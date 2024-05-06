const express = require("express");
const todoRouter = express.Router();
todoRouter.use (express.json());
todoRouter.use(express.urlencoded({ extended: true }));
const { getTodo, createTodo,updateTodo,deleteTodo } = require('../controllers/todosController.js');

todoRouter.route("/")
.post(async (req, res) => {
        const todo = await createTodo(req.body.user_id,req.body.title,req.body.completed);
        res.send(todo);
})

todoRouter
    .route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        const todo = await getTodo(id);
        res.send(todo);
    })
    .put(async(req, res) => {
        const id = req.params.id;
        const todo = await updateTodo(id,req.body.user_id,req.body.title,req.body.completed);
        res.send(todo);
    })
    .delete(async(req, res) => {
        const id = req.params.id;
        const todo = await deleteTodo(id);
    })

module.exports = todoRouter;