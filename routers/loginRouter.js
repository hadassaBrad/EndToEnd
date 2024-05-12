const express = require("express");
const loginRouter = express.Router();
loginRouter.use (express.json());
loginRouter.use(express.urlencoded({ extended: true }));
const { postLogin } = require('../controllers/usersController.js');
userRouter.route("/")
.post(async (req, res) => {
        const user = await postLogin(req.body.email,req.body.password);
        res.send(user);
})