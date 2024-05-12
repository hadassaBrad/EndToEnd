const express = require("express");
const loginRouter = express.Router();
loginRouter.use (express.json());
loginRouter.use(express.urlencoded({ extended: true }));
const { postLogin } = require('../controllers/usersController.js');
loginRouter.route("/")
.post(async (req, res) => {
        const user = await postLogin(req.body.email,req.body.password);
      console.log(user);
        res.send(user);
})

module.exports = loginRouter;