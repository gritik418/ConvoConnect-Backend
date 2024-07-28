import passport from "passport";
import { Strategy as GoogleStrategy, } from "passport-google-oauth20";
import User from "../models/User.js";
import UserService from "../services/user.js";
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.DOMAIN}/auth/google/callback`,
}, async function (accessToken, refreshToken, profile, done) {
    try {
        const user = await UserService.getUserByEmail(profile.emails[0].value);
        if (user && user.email_verified) {
            return done(null, user);
        }
        else {
            const newUser = new User({
                first_name: profile.name?.givenName,
                last_name: profile.name?.familyName,
                email: profile.emails[0].value,
                username: profile.username ||
                    profile.name?.familyName
                        .toLowerCase()
                        .concat(profile.name.givenName.toLowerCase()),
                email_verified: true,
                avatar: profile.photos
                    ? profile.photos[0].value
                    : `${process.env.DOMAIN}/images/avatar.jpeg`,
                background: `${process.env.DOMAIN}/images/profile-bg.jpg`,
                provider: "google",
            });
            const savedUser = await newUser.save();
            return done(null, savedUser);
        }
    }
    catch (error) {
        return done(new Error("Authentication Failed."), false);
    }
}));
