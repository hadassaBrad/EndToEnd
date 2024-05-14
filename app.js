const express = require('express');
const userRouter = require('./routers/usersRouter');
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