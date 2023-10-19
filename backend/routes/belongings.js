import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { createBelongings, deleteBelongings, getAllBelongings,getBelongingsUserStatus, getBelongings, getBelongingsUser, updateBelongings } from "../controllers/belongings.js";


const router = express.Router();

// CREATE
router.post("/",verifyUser, createBelongings);

// UPDATE 
router.put("/:id",verifyUser, updateBelongings);

// DELETE 
router.delete("/:id",verifyUser, deleteBelongings);

// GET ONE
router.get("/find/:id",verifyUser,getBelongings);


// get status belongins
router.get("/status",verifyUser,getBelongingsUserStatus);

// GET FROM USER
router.get("/utilisateur",verifyUser,getBelongingsUser);

// GET ALL
router.get("/",verifyUser,getAllBelongings );

export default router;
