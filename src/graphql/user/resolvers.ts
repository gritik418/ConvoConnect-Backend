import User from "../../models/User.js";
import UserService from "../../services/user.js";

const queries = {
  getCurrentLoggedInUser: async (_: any, argument: any, context: any) => {
    try {
      const token = context.token;
      const jwt_payload: any = await UserService.verifyAuthToken(token)!;
      if (!jwt_payload) return null;
      const user = await UserService.getUserById(jwt_payload.id);
      return user;
    } catch (error) {
      return null;
    }
  },
};

const mutations = {};

const user = {
  friend_requests: async (parent: UserType, argument: any, context: any) => {
    if (!parent.friend_requests) return [];
    const user = await User.findById(parent.id)
      .select({ friend_requests: 1, _id: 0 })
      .populate("friend_requests");

    return user.friend_requests;
  },
};

const resolvers = {
  queries,
  user,
};

export default resolvers;
