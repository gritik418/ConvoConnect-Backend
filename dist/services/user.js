import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class UserService {
    static async getUserById(id) {
        const user = await User.findById(id);
        return user;
    }
    static async getUserByEmail(email) {
        const user = await User.findOne({ email, email_verified: true });
        return user;
    }
    static async getUserByUsername(username) {
        const user = await User.findOne({ username });
        return user;
    }
    static async deleteUserByUsername(username) {
        await User.findOneAndDelete({ username });
    }
    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    static async getUserByEmailOrUsername(email) {
        const user = await User.findOne({
            $or: [{ email }, { username: email }],
        });
        return user;
    }
    static async generateAuthToken(payload) {
        try {
            const authToken = jwt.sign(payload, process.env.JWT_TOKEN);
            return authToken;
        }
        catch (error) {
            return null;
        }
    }
    static async verifyAuthToken(token) {
        try {
            const verify = jwt.verify(token, process.env.JWT_TOKEN);
            return verify;
        }
        catch (error) {
            return null;
        }
    }
    static async setUserToActive(id) {
        await User.findByIdAndUpdate(id, {
            $set: { is_active: true },
        });
    }
    static async setUserToInActive(id) {
        await User.findByIdAndUpdate(id, {
            $set: { is_active: false },
        });
    }
}
export default UserService;
