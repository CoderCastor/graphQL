import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";

async function init() {
  const port = 8000;
  const app = express();

  const gqlServer = new ApolloServer({
    typeDefs: `
    type User { 
      id: ID! 
      name: String 
    }

    type Query {
      books: [String]
    }
  `,
    resolvers: {
      Query: {
        books: () => [],
      },
    },
  });

  app.get("/", (req, res) => {
    res.json({
      message: `Server is running on PORT:${port}`,
    });
  });

  app.listen(port, () => console.log(`Server is running on PORT:${port}`));
}

init();
