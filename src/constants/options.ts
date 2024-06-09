import { CookieOptions } from "express";

const cookieOptions: CookieOptions = {
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

export { cookieOptions };
