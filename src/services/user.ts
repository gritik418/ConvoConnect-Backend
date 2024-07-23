import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {
  public static async getUserById(id: string) {
    const user = await User.findById(id);
    return user;
  }

  public static async getUserByEmail(email: string) {
    const user = await User.findOne({ email, email_verified: true });
    return user;
  }

  public static async getUserByUsername(username: string) {
    const user = await User.findOne({ username });
    return user;
  }

  public static async deleteUserByUsername(username: string) {
    await User.findOneAndDelete({ username });
  }

  public static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  public static async getUserByEmailOrUsername(email: string) {
    const user = await User.findOne({
      $or: [{ email }, { username: email }],
    });
    return user;
  }

  public static async generateAuthToken(payload: JWTPayloadType) {
    try {
      const authToken = jwt.sign(payload, process.env.JWT_TOKEN!);
      return authToken;
    } catch (error) {
      return null;
    }
  }

  public static async verifyAuthToken(token: string) {
    try {
      const verify = jwt.verify(token, process.env.JWT_TOKEN!);
      return verify;
    } catch (error) {
      return null;
    }
  }

  public static async setUserToActive(id: string) {
    await User.findByIdAndUpdate(id, {
      $set: { is_active: true },
    });
  }

  public static async setUserToInActive(id: string) {
    await User.findByIdAndUpdate(id, {
      $set: { is_active: false },
    });
  }
}

export default UserService;
