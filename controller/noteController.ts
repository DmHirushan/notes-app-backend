import { Request, Response } from "express";
import Note from "../model/Note";

export const getAllNotes = async (req: any, res: any) => {
    try {
        const notes = await Note.find();

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved!",
        });
    } catch (err) {
        console.error("Error fetching notes:", err);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

export const createNote = async (req: any, res: any) => {
    const {title, content, tags, userId} = req.body;
    console.log("body : ", req.body);


    if (!title || !content) {
        return res.status(400).json({error: true, message: "Fields are required!"});
    }

    try{
        const note = new Note({
            title,
            content,
            tags : tags || [],
            userId : userId,
        });


        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully!",
        });
    }catch(err){
        return res.status(500).json({error: true, message: "Internal Server Error"});
    }
}

export const updateNote = async (req: any, res: any) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;

    console.log('noteID: ', noteId);

    // Ensure at least one field is provided for update
    if (!title && !content && !tags && typeof isPinned === 'undefined') {
        return res.status(400).json({ error: true, message: "No changes provided!" });
    }

    try {
        const note = await Note.findById(noteId);

        console.log("Note:", note);

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found!" });
        }

        // Update fields only if they are provided
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        console.log('Updated Note:', note);

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (err) {
        console.error("Error updating note:", err);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

export const deleteNote = async (req: any, res: any) => {
    const noteId = req.params.noteId;

    try {
        const note = await Note.findOne({ _id: noteId });

        if (!note) {
            return res.status(404).json({error: true, message: "Note not found!"});
        }

        await Note.deleteOne({ _id: noteId });

        return res.json({
            error: false,
            message: "Note deleted successfully",
        })
    }catch(err){}
}

export const updateIsPinned = async (req: any, res: any) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;

    console.log('noteID: ', noteId);

    // Ensure at least one field is provided for update
    if (typeof isPinned === 'undefined') {
        return res.status(400).json({ error: true, message: "No changes provided!" });
    }

    try {
        const note = await Note.findById(noteId);

        console.log("Note:", note);

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found!" });
        }

        note.isPinned = isPinned;

        console.log('Updated Note:', note);

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (err) {
        console.error("Error updating note:", err);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
