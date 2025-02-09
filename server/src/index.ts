import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";
import { prismaClient } from "./lib/db";

async function init() {
  const port = 8000;
  const app = express();

  app.use(cors());
  app.use(express.json());

  const gqlServer = new ApolloServer({
    //schema layer
    typeDefs: `  
    type Query {
      hello : String
      user(name : String) : String
    }

    type Mutation {
      createUser(firstName:String!,lastName:String!,email:String!,password:String!) : Boolean
    }
  `,
    resolvers: {
      Query: {
        hello: () => `Hello codercastor. How are you ?`,
        user: (_, { name }: { name: string }) => `Hey ${name}, How are you ?`,
      },

      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: "random_salt",
            },
          });
          return true;
        },
      },
    },
  });

  app.get("/", (req, res) => {
    res.json({
      message: `Server is running on PORT:${port}`,
    });
  });

  //start the gqlServer
  await gqlServer.start();

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(port, () => console.log(`Server is running on PORT:${port}`));
}

init();
