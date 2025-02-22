import express from "express";
import {getAllNotes} from "../controller/noteController";

const router = express.Router();

router.get("/getAll", getAllNotes);

export default router;