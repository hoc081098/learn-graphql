const Event = require('../../models/event');
const Booking = require('../../models/booking');

const { transformBooking, transformEvent } = require('./merge');

const resolvers = {
  bookings: async () => {
    const bookings = await Booking.find().exec();
    return bookings.map(transformBooking);
  },
  bookEvent: async args => {
    const { eventId } = args;
    console.log({ eventId });

    const event = await Event.findById(eventId).exec();
    if (!event) {
      throw new Error(`Event with id '${eventId}' does not exists`);
    }

    const booking = new Booking({
      user: '5d3c84f9c85de004ac6b84c9',
      event: eventId
    });
    const result = await booking.save();

    return transformBooking(result);
  },
  cancelBooking: async args => {
    const { bookingId } = args;

    const booking = await Booking.findById(bookingId).populate('event').exec();
    await Booking.deleteOne({ _id: bookingId }).exec();

    return transformEvent(booking.event);
  },
};

module.exports = resolvers;