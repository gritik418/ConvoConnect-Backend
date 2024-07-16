import { CorsOptions } from "cors";
import { CookieOptions } from "express";

export const corsOptions: CorsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

export const cookieOptions: CookieOptions = {
  sameSite: "none",
  httpOnly: true,
};
