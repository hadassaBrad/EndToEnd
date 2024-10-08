const express = require("express");
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));
const { getUser, createUser, updateUser } = require('../controllers/usersController.js');

userRouter.route("/")
    .post(async (req, res) => {
        try {
            const user = await createUser(req.body.lastName, req.body.firstName, req.body.email, req.body.phone, req.body.address.city, req.body.address.street, req.body.password);
            res.send(user);
        }
        catch {
            res.status(401).send("this user is already exist, please login");
        }
    })

userRouter
    .route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        const user = await getUser(id);
        res.send(user);
    })
    .put(async (req, res) => {
        const id = req.params.id;
        const user = await updateUser(id, req.body.lastName, req.body.firstName, req.body.email, req.body.phone, req.body.address.city, req.body.address.street, req.body.password);
        res.send(user);
    })

module.exports = userRouter;