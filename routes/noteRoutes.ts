import express from "express";
import {createNote, deleteNote, getAllNotes, updateIsPinned, updateNote} from "../controller/noteController";

const router = express.Router();

router.get("/getAll", getAllNotes);
router.post("/createNote", createNote);
router.put("/editNote/:noteId", updateNote);
router.put("/updateIsPinned/:noteId", updateIsPinned);
router.delete("/deleteNote/:noteId", deleteNote);

export default router;