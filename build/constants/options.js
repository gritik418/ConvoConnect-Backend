const cookieOptions = {
    sameSite: "none",
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};
const corsOptions = {
    origin: [process.env.CLIENT_URL, "http://localhost:3000"],
    credentials: true,
};
export { cookieOptions, corsOptions };
