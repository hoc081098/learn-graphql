const DataLoader = require('dataloader');

const Event = require('../../models/event');
const User = require('../../models/user');

const { dateToString } = require('../../util/date');

const eventsLoader = new DataLoader(async ids => {
  console.log('events', { ids });
  const events = await Event.find({ _id: { $in: ids } });
  return events.map(transformEvent);
});

const userLoader = new DataLoader(ids => {
  console.log('user', { ids });
  return User.find({ _id: { $in: ids } }).exec();
});

const findUserById = async id => {
  const user = await userLoader.load(id.toString());
  return {
    ...user._doc,
    createdEvents: () => eventsLoader.loadMany(user.createdEvents.map(id => id.toString())),
  };
};

const findEventById = id => eventsLoader.load(id.toString());

/**
 * 
 * @param {*} event 
 */
const transformEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event.date),
    creator: () => findUserById(event.creator),
  };
}

/**
 * 
 * @param {*} booking 
 */
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
  transformEvent,
  transformBooking,
}
