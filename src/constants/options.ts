import { CorsOptions } from "cors";
import { CookieOptions } from "express";

const cookieOptions: CookieOptions = {
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const corsOptions: CorsOptions = {
  origin: [process.env.CLIENT_URL!],
  credentials: true,
};

export { cookieOptions, corsOptions };
