import jwt from "jsonwebtoken";
import { createError } from "./errors.js";

export const verifyToken =(req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token) return next(createError(401,"You are not Authenticated !"));

    jwt.verify(token,process.env.JWT,(error,user)=>{
        if(error) return next(createError(403,"Token not valide!"));
        req.user = user;
        next();
    })
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id){
            next();
        }else{
            return next(createError(403,"You are not authorized! "));
        }
    })
}

