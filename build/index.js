import express from "express";
import connectToDB from "./database/mongoose.config.js";
const app = express();
const port = process.env.PORT || 8000;
connectToDB();
app.get("/", (req, res) => {
    res.send({ message: "Server is up and running" });
});
app.listen(port, () => {
    console.log(`App served at: http://localhost:${port}`);
});
