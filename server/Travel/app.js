import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routing/user-routes";
import postRouter from "./routing/post-routes";
import cors from 'cors';

const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/user',userRouter);
app.use('/posts',postRouter);


mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.ruhd40d.mongodb.net/?retryWrites=true&w=majority`
).then(()=>app.listen(5000,()=>console.log("Connection Successfull with port 5000"))
).catch(err=>console.log(err));

  

 //8mutPJoRGgJ1ptdw