import UserService from "../../services/user.js";
const queries = {
    getCurrentLoggedInUser: async (_, argument, context) => {
        try {
            const token = context.token;
            const jwt_payload = await UserService.verifyAuthToken(token);
            if (!jwt_payload)
                return null;
            const user = await UserService.getUserById(jwt_payload.id);
            return user;
        }
        catch (error) {
            return null;
        }
    },
};
const mutations = {};
const resolvers = {
    queries,
};
export default resolvers;
