import dotenv from "dotenv";
import express from "express";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();

import UsersRoute from "./routes/users.js";
import BelongingsRoute from "./routes/belongings.js";
import TenantRoute from './routes/tenants.js';

const app = express();

// connexion à la base de données
const connexionDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongo db")
    } catch (error) {
       throw error; 
    }
}
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: [
        process.env.FRONT
      ],
      credentials: true,
    })
  );

app.use("/api/auth",UsersRoute);
app.use("/api/belongings",BelongingsRoute);
app.use("/api/tenant",TenantRoute);

// error handler
app.use((error,req,res,next)=>{
    const errorStatus = error.status || 500;
    const errorMessage = "Something went wrong!"
    return res.status(500).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack:error.stack
    });
});
app.listen(process.env.PORT,()=>{
    // appel à la fonction de la connexion base de données
    connexionDB()
    console.log(`the app is running in the port ${process.env.PORT}`)
});