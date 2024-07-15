import { ApolloServer } from "@apollo/server";

const connectGraphQLServer = () => {
  const server = new ApolloServer({
    typeDefs: ``,
    resolvers: {},
  });

  return server;
};

export default connectGraphQLServer;
