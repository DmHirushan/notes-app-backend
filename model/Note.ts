import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
    title: string;
    content: string;
    tags?: string[];
    isPinned?: boolean;
    userId: string;
    createdOn?: Date;
}

const NoteSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: { type: String, required: true },
    createdOn: { type: Date, default: () => new Date() },
});

export default mongoose.model<INote>("Note", NoteSchema);
