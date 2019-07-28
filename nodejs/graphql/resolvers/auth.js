const bscrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(`User with email '${email}' does not exists`);
    }

    const matchPassword = await bscrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' },
    );

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};

module.exports = resolvers;