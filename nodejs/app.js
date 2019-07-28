const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();

const resolvers = require('./graphql/resolvers/index');
const schema = require('./graphql/schema/index');

const authMiddleware = require('./middleware/auth');

const mongoose = require('mongoose');

app.use(express.json());

app.use(authMiddleware);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  }),
);

mongoose
  .connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds031893.mlab.com:31893/learn-graphql`, {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to database'))
  .catch((e) => console.log('Connect to database error: ', e));

app.listen(3000, () => console.log('App running...'));