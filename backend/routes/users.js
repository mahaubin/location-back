import express from "express";
import { loggedIn, login, logout, register } from "../controllers/users.js";

const router = express.Router()

    router.post("/register",register);
    router.post('/login',login);
    router.get("/logout", logout);
    router.get("/loggedIn", loggedIn);

export default router;