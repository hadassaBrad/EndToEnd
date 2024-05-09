const express = require("express");
const userRouter = express.Router();
userRouter.use (express.json());
userRouter.use(express.urlencoded({ extended: true }));
const { getUser, createUser,updateUser,deleteUser,getUserByEmail } = require('../controllers/usersController.js');

userRouter.route("/")
// .get(async (req, res) => {
//     const email = req.query.email;
//     const user = await getUserByEmail(email);
//     res.send(user);
// })
.post(async (req, res) => {
        const user = await createUser(req.body.lastName, req.body.firstName, req.body.email,req.body.phone,req.body.address.city,req.body.address.street,req.body.password);
       console.log(user);
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
    
//     userRouter.route("/:email")
// .get(async (req, res) => {
//     const email = req.params.email;
//     const user = await getUserByEmail(email);
//     res.send(user);
// })
module.exports = userRouter;