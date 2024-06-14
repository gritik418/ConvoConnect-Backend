const cookieOptions = {
    sameSite: "none",
    httpOnly: true,
    secure: true,
};
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
};
export { cookieOptions, corsOptions };
