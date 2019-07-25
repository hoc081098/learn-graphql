const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

const mongoose = require('mongoose');
const Event = require('./models/event');

app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      } 

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: async () => {
        const docs = await Event.find().exec();
        return docs.map(doc => {
          return { ...doc._doc };
        });
      },
      createEvent: async (args) => {
        const { eventInput } = args;
        const event = new Event({
          title: eventInput.title,
          description: eventInput.description,
          price: +eventInput.price,
          date: new Date(eventInput.date),
        });
        const result = await event.save();
        return result._doc;
      }
    },
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