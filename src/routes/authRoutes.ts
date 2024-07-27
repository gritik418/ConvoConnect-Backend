import { Router } from "express";
import passport from "passport";
import "../middlewares/passport.js";
import UserService from "../services/user.js";
import { CC_TOKEN } from "../constants/variables.js";
import { cookieOptions } from "../constants/options.js";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    successRedirect: `${process.env.CLIENT_URL}/`,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  async function (req: any, res) {
    if (req.user) {
      const token = await UserService.generateAuthToken({
        email: req.user.email,
        id: req.user._id.toString(),
      });

      return res
        .status(200)
        .cookie(CC_TOKEN, token, cookieOptions)
        .redirect(`${process.env.CLIENT_URL}/`);
    }
    return res.status(401).redirect(`${process.env.CLIENT_URL}/login`);
  }
);

export default router;
