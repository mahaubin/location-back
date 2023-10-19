import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/errors.js';


export const register = async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password);

        const newUser = new User({
            lastName : req.body.lastName,
            firstName: req.body.firstName,
            belongings: req.body.belongings,
            tenant:req.body.tenant,
            email:req.body.email,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("New user has been created");
    } catch (error) {
        next(error)
    }
};

export const login = async (req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) return next(createError(404,"User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect) return next(createError(400,"Wrong password or username!"));

        const token = jwt.sign({id:user._id},process.env.JWT)

        const {password,...otherDetails} = user._doc;

        res.cookie("access_token",token,{httpOnly:true}).status(200).json({...otherDetails});

    } catch (error) {
        next(error);
    }
};

export const logout = async (req,res,next)=>{
    res
    .cookie("access_token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
}

export const loggedIn =  async (req,res,next)=>{
    try {
        const token = req.cookies.access_token;
        if (!token) return res.json(false);
    
        jwt.verify(token, process.env.JWT);
    
        res.send(true);
      } catch (err) {
        next(error);
      }
}