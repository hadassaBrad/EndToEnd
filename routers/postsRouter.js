const express = require("express");
const postRouter = express.Router();
postRouter.use (express.json());
postRouter.use(express.urlencoded({ extended: true }));
const { getPost,getPosts, createPost,updatePost,deletePost } = require('../controllers/postsController.js');

postRouter.route("/")
.get(async (req, res) => {
    const id = req.query.user_id;
    console.log(id);
    const post = await getPosts(id);
    res.send(post);
})
.post(async (req, res) => {
        const post = await createPost(req.body.user_id,req.body.title,req.body.body);
        res.send(post);
    })

postRouter
    .route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        const post = await getPost(id);
        res.send(post);
    })
    .put(async(req, res) => {
        const id = req.params.id;
        const post = await updatePost(id,req.body.user_id,req.body.title,req.body.body);
        res.send(post);
    })
    .delete(async(req, res) => {
        const id = req.params.id;
        const post = await deletePost(id);
    })

module.exports = postRouter;