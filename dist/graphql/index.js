import { ApolloServer } from "@apollo/server";
import user from "./user/index.js";
const connectGraphQLServer = () => {
    const server = new ApolloServer({
        typeDefs: `#graphql
      ${user.typedef}

      type Query {
        ${user.queries}
      }
    `,
        resolvers: {
            User: {
                ...user.resolvers.user,
            },
            Query: {
                ...user.resolvers.queries,
            },
        },
    });
    return server;
};
export default connectGraphQLServer;
