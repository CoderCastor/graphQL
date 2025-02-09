import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import { User } from "./user";

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    //schema layer
    typeDefs: `  
        type Query {
          ${User.queries}
        }
    
        type Mutation {
          ${User.mutations}
        }
      `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation : {
        ...User.resolvers.mutations
      }
    },
  });

  //start the gqlServer
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
