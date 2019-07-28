const bscrypt = require('bcrypt');
const Event = require('../../models/event');
const User = require('../../models/user');

const findUserById = async id => {
  const user = await User.findById(id);
  return {
    ...user._doc,
    createdEvents: () => findEventsByIds(user.createdEvents),
  };
};

const findEventsByIds = async ids => {
  const events = await Event.find({ _id: { $in: ids } });
  return events.map(event => {
    return {
      ...event._doc,
      date: new Date(event.date).toISOString(),
      creator: () => findUserById(event.creator),
    };
  });
}

const resolvers = {
  events: async () => {
    const events = await Event.find().exec();
    return events.map(event => {
      return {
        ...event._doc,
        date: new Date(event.date).toISOString(),
        creator: () => findUserById(event.creator),
      };
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

    return {
      ...result._doc,
      date: new Date(result.date).toISOString(),
      creator: () => findUserById(result.creator),
    };
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
};

module.exports = resolvers;