import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "./src/graphql";
import mongoose from "mongoose";
import cors from "cors";
import models from "./src/db";

dotenv.config();

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
const PORT = process.env.PORT || 5000;
const graphqlEndpoint = "/graphql";

app.use(cors("*"));

app.use(
  graphqlEndpoint,
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models
    }
  })
);

app.use("/graphiql", graphiqlExpress({ endpointURL: graphqlEndpoint }));

app.listen(PORT, () => console.log(`Express up and running on ${PORT}`));
