const Event = require('../../models/event');
const User = require('../../models/user');

const { dateToString } = require('../../util/date');

const findUserById = async id => {
  const user = await User.findById(id);
  return {
    ...user._doc,
    createdEvents: () => findEventsByIds(user.createdEvents),
  };
};

const findEventById = async id => {
  const event = await Event.findById(id);
  return transformEvent(event);
}

const findEventsByIds = async ids => {
  const events = await Event.find({ _id: { $in: ids } });
  return events.map(transformEvent);
}

const transformEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event.date),
    creator: () => findUserById(event.creator),
  };
}

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: () => findUserById(booking.user),
    event: () => findEventById(booking.event),
    createdAt: dateToString(booking.createdAt),
    updatedAt: dateToString(booking.updatedAt),
  };
}

module.exports = {
  findUserById,
  findEventById,
  findEventsByIds,
  transformEvent,
  transformBooking,
}
