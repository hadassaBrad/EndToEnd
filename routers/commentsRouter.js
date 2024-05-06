const express = require("express");
const commentRouter = express.Router();
commentRouter.use (express.json());
commentRouter.use(express.urlencoded({ extended: true }));
const { getComment, createComment,updateComment,deleteComment } = require('../controllers/commentsController.js');

commentRouter.route("/")
.post(async (req, res) => {
        const comment = await createComment(req.body.postId,req.body.name,req.body.email,req.body.body);
        res.send(comment);
})

commentRouter
    .route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        const comment = await getComment(id);
        res.send(comment);
    })
    .put(async(req, res) => {
        const id = req.params.id;
        const comment = await updateComment(id,req.body.postId,req.body.name,req.body.email,req.body.body);
        res.send(comment);
    })
    .delete(async(req, res) => {
        const id = req.params.id;
        const comment = await deleteComment(id);
    })

module.exports = commentRouter;