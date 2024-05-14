const express = require("express");
const loginRouter = express.Router();
loginRouter.use(express.json());
loginRouter.use(express.urlencoded({ extended: true }));
const { postLogin } = require('../controllers/usersController.js');

loginRouter.route("/")
  .post(async (req, res) => {
    try {
      const user = await postLogin(req.body.email, req.body.password);
      res.send(user);
    }
    catch (err) {
      if (err.message == "not Exsist") {
        res.status(401).send("this user not exist, please signup");
      }
      if (err.message == "not valid password") {
        res.status(401).send("email or password is not valid");
      }
    }
  })

module.exports = loginRouter;