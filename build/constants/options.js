const cookieOptions = {
    sameSite: "none",
    httpOnly: true,
    secure: true,
};
const corsOptions = {
    origin: [process.env.CLIENT_URL],
    credentials: true,
};
export { cookieOptions, corsOptions };
