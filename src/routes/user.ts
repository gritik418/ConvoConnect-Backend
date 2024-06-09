import express from "express";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  console.log(req.params.user);
  return res.send(req.params.user);
});

export default router;
