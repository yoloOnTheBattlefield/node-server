import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import cors from "cors";

dotenv.config(); // load .env

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./src/schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./src/resolvers"))
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
const PORT = 8081;
const graphqlEndpoint = "/graphql";

app.use(cors("*"));

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema
  }))
);

app.use("/graphiql", graphiqlExpress({ endpointURL: graphqlEndpoint }));

app.listen(PORT, () => console.log(`Express up and running on ${PORT}`));
