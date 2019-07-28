const authResolver = require('./auth');
const eventResolver = require('./event');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...eventResolver,
  ...bookingResolver,  
};

module.exports = rootResolver;