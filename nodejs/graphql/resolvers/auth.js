const bscrypt = require('bcrypt');
const User = require('../../models/user');

const resolvers = {
  createUser: async args => {
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
};

module.exports = resolvers;