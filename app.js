const express = require('express');
const userRouter = require('./routers/usersRouter');
// const cookiesRouter = require('./routers/cookies');
// const recipeRouter = require('./routers/recipe');
const config = require('./config/config');
const fs = require('fs');

const path = require('path');
const app = express();

app.use(express.json());
const cors = require('cors'); 
const todoRouter = require('./routers/todosRouter');
const postRouter = require('./routers/postsRouter');
const loginRouter= require ('./routers/loginRouter');
const commentRouter = require('./routers/commentsRouter');
app.use(cors());


// const logger = (req, res, next)=>{
//     const url = req.url;
//     const date = new Date();
//     const msg = `Date: ${date}, Url:${url} \n`;
//     fs.appendFile(path.join(__dirname, 'log.txt'), msg, ()=>{
//         console.log('success!!');
//         next();
//     });

// }
// app.use(logger);

// app.use('/cakes', cakesRouter);
// app.use('/cookies', cookiesRouter);
// app.use('/user', (req, res, next)=>{
//     console.log('user');
//     next();
// },
// recipeRouter);

// app.use('*', (req, res)=>{
//     res.sendStatus(404);
// })

app.use('/users', (req, res, next)=>{
        console.log('user');
        next(); 
 },userRouter);

 app.use('/todos', (req, res, next)=>{
    console.log('todo');
    next(); 
},todoRouter);

app.use('/posts', (req, res, next)=>{
    console.log('post');
    next(); 
},postRouter);

app.use('/comments', (req, res, next)=>{
    console.log('comment');
    next(); 
},commentRouter);

app.use('/login', (err,req, res, next)=>{
    console.log('login');
    next(); 
},loginRouter);



app.listen(config.PORT, ()=>{
    console.log(`app is listening on port ${config.PORT}`)
})