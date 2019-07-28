const bscrypt = require('bcrypt');
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const findUserById = async id => {
  const user = await User.findById(id);
  return {
    ...user._doc,
    createdEvents: () => findEventsByIds(user.createdEvents),
  };
};

const findEventById = async id => {
  const event = await Event.findById(id);
  return {
    ...event._doc,
    date: new Date(event.date).toISOString(),
    creator: () => findUserById(event.creator),
  }
}

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
  bookings: async () => {
    const bookings = await Booking.find().exec();
    return bookings.map(booking => {
      return {
        ...booking._doc,
        user: () => findUserById(booking.user),
        event: () => findEventById(booking.event),
        createdAt: new Date(booking.createdAt).toISOString(),
        updatedAt: new Date(booking.updatedAt).toISOString(),
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
  },
  bookEvent: async args => {
    const { eventId } = args;
    console.log({ eventId });

    const event = await Event.findById(eventId).exec();
    if (!event) {
      throw new Error(`Event with id '${eventId} not exists'`);
    }

    const booking = new Booking({
      user: '5d3c84f9c85de004ac6b84c9',
      event: eventId
    });
    const result = await booking.save();

    return {
      ...result._doc,
      user: () => findUserById(result.user),
      event: {
        ...event._doc,
        date: new Date(event.date).toISOString(),
        creator: () => findUserById(event.creator),
      },
      createdAt: new Date(result.createdAt).toISOString(),
      updatedAt: new Date(result.updatedAt).toISOString(),
    };
  },
  cancelBooking: async args => {
    const { bookingId } = args;
    
    const booking = await Booking.findById(bookingId).populate('event').exec();
    await Booking.deleteOne({ _id: bookingId }).exec();
    
    return {
      ...booking.event._doc,
      date: new Date(booking.event.date).toISOString(),
      creator: () => findUserById(booking.event.creator),
    };
  },
};

module.exports = resolvers;