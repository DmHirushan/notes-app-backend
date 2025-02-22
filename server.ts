import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import noteRoutes from "./routes/noteRoutes";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));


// routes
app.use("/api/v1/notes", noteRoutes)


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


