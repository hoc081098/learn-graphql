const Event = require('../../models/event');
const Booking = require('../../models/booking');

const { transformBooking, transformEvent } = require('./merge');

const resolvers = {
  bookings: async (_, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const bookings = await Booking.find().exec();
    return bookings.map(transformBooking);
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    
    const { eventId } = args;
    console.log({ eventId });

    const event = await Event.findById(eventId).exec();
    if (!event) {
      throw new Error(`Event with id '${eventId}' does not exists`);
    }

    const booking = new Booking({
      user: req.userId,
      event: eventId
    });
    const result = await booking.save();

    return transformBooking(result);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const { bookingId } = args;

    const booking = await Booking.findById(bookingId).populate('event').exec();
    await Booking.deleteOne({ _id: bookingId }).exec();

    return transformEvent(booking.event);
  },
};

module.exports = resolvers;