import { CorsOptions } from "cors";
import { CookieOptions } from "express";

const cookieOptions: CookieOptions = {
  sameSite: "none",
  httpOnly: true,
  domain: process.env.CLIENT_URL,
  secure: true,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

const corsOptions: CorsOptions = {
  origin: [process.env.CLIENT_URL!],
  credentials: true,
};

export { cookieOptions, corsOptions };
