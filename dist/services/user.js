import User from "../models/User.js";
import bcrypt from "bcryptjs";
class UserService {
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
}
export default UserService;
