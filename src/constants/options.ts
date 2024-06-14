import { CorsOptions } from "cors";
import { CookieOptions } from "express";

const cookieOptions: CookieOptions = {
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

export { cookieOptions, corsOptions };
