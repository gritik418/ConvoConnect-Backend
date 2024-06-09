import express from "express";
import connectToDB from "./database/mongoose.config.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8000;
connectToDB();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`App served at: http://localhost:${port}`);
});
