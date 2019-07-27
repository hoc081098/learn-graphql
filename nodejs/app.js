const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

const bscrypt = require('bcrypt');

const mongoose = require('mongoose');
const Event = require('./models/event');
const User = require('./models/user');

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

      type User {
        _id: ID!
        email: String!
        password: String
      }

      input UserInput {
        email: String!
        password: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
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
        const user = await User.findById('5d3c84f9c85de004ac6b84c9');
        if (!user) {
          throw new Error('User not found');
        }

        const { eventInput } = args;
        const event = new Event({
          title: eventInput.title,
          description: eventInput.description,
          price: +eventInput.price,
          date: new Date(eventInput.date),
          creator: '5d3c84f9c85de004ac6b84c9'
        });
        const result = await event.save();

        user.createdEvents.push(result._id);
        await user.save();

        return result._doc;
      },
      createUser: async (args) => {
        const { userInput } = args;
        const doc = await User.findOne({ email: userInput.email }).exec();
        if (doc) {
          throw new Error(`User with email: '${userInput.email}' already exists`);
        }

        const hashedPassword = await bscrypt.hash(userInput.password, 12);

        const user = new User({
          email: userInput.email,
          password: hashedPassword
        });
        const result = await user.save();
        return { ...result._doc, password: undefined };
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