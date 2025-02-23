import express from "express";
import {createNote, deleteNote, getAllNotes, updateIsPinned, updateNote} from "../controller/noteController";
import {protector} from "../middleware/authMiddlewear";

const router = express.Router();

router.get("/getAll", protector, getAllNotes);
router.post("/createNote", protector, createNote);
router.put("/editNote/:noteId", protector, updateNote);
router.put("/updateIsPinned/:noteId", protector, updateIsPinned);
router.delete("/deleteNote/:noteId", protector, deleteNote);

export default router;