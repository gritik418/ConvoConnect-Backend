import express from "express";
import connectToDB from "./database/mongoose.config.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
const app = express();
const port = process.env.PORT || 8000;
connectToDB();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.listen(port, () => {
    console.log(`App served at: http://localhost:${port}`);
});
