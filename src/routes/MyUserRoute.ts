import express from "express";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();

// api/my/user
router.post("/", MyUserController.createcurrentuser);

export default router;
