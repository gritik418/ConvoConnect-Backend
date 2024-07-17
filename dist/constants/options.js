export const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
export const cookieOptions = {
    sameSite: "none",
    httpOnly: true,
};
