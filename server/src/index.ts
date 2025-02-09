import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import createApolloGraphqlServer from "./graphql";

async function init() {
  const port = 8000;
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      message: `Server is running on PORT:${port}`,
    });
  });

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.listen(port, () => console.log(`Server is running on PORT:${port}`));
}

init();
