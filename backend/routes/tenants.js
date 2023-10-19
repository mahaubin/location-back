import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { createTenant, deleteTenant, getAllTenant, getTenant, getTenantUser, updateTenant } from "../controllers/tenants.js";
import { getBelongings } from "../controllers/belongings.js";

const router = express.Router();

// CREATE
router.post("/",verifyUser, createTenant);

// UPDATE 
router.put("/:id",verifyUser, updateTenant);

// DELETE 
router.delete("/:id/:idbien",verifyUser, deleteTenant);

// GET ONE
router.get("/find/:id",verifyUser,getTenant);

// GET FROM USER
router.get("/utilisateur",verifyUser,getTenantUser);

// GET ALL
router.get("/",verifyUser,getAllTenant);

export default router;