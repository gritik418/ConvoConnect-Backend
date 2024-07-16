import { ApolloServer } from "@apollo/server";
const connectGraphQLServer = () => {
    const server = new ApolloServer({
        typeDefs: `
      type Query {
      name: String
      }
    `,
        resolvers: {},
    });
    return server;
};
export default connectGraphQLServer;
