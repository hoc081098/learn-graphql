const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./merge');

const resolvers = {
  events: async () => {
    const events = await Event.find().exec();
    return events.map(transformEvent);
  },
  createEvent: async args => {
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

    return transformEvent(result);
  }
};

module.exports = resolvers;