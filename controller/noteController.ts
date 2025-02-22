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
