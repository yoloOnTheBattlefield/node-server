import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "./src/graphql";
import mongoose from "mongoose";
import cors from "cors";
import models from "./src/db";

//  initialise .env file which contains keys for our app
dotenv.config();

//  connect to the DB and tell mongoose to use the global promise
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

//  create the graphql schema by importing the type definitions and the resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

//  initialise the app
const app = express();

//  set the port
const PORT = process.env.PORT || 5000;
const graphqlEndpoint = "/graphql";

app.use(cors("*"));

app.use(
  graphqlEndpoint,
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  graphqlExpress({
    schema, //  add the schema
    context: {
      models // add the models to the context, so you can use it in the resolvers
    }
  })
);

//  set the route for the graphiql interface so you can query and mutate the DB interactively
app.use("/graphiql", graphiqlExpress({ endpointURL: graphqlEndpoint }));

app.listen(PORT, () => console.log(`Express up and running on ${PORT}`));
