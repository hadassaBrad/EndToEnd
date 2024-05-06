const express = require("express");
const router = express.Router();
router.use (express.json());
router.use(express.urlencoded({ extended: true }));
const { getUser, createUser,updateUser,deleteUser } = require('../controllers/usersController.js');

userRouter.route("/")
.post(async (req, res) => {
        const user = await createUser(req.body.lastName, req.body.firstName, req.body.email,req.body.phone,req.body.city,req.body.street,req.body.password);
        res.send(user);
})

userRouter
    .route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        const user = await getUser(id);
        res.send(user);
    })  
    .put(async(req, res) => {
        const id = req.params.id;
        const user = await updateUser(id,req.body.lastName, req.body.firstName, req.body.email,req.body.phone,req.body.city,req.body.street,req.body.password);
        res.send(user);
    })
    .delete(async(req, res) => {
        const id = req.params.id;
        const user = await deleteUser(id);
    })

module.exports = userRouter;