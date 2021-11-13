const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const { AuthenticationError } = require('apollo-server-express');


// import schema from Book.js
const bookSchema = require('./Book');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [bookSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  // console.log(this.password) //logs normal password
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    // console.log(this.password) //logs hashed password
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  // throw new AuthenticationError(`password ${password}`);
  // console.log(password);
  // console.log(this.password);
  // console.log(bcrypt.compare(password, this.password));
  const match = await bcrypt.compare(password, this.password);
  // console.log(match);

  if (match) {
    return match
  } else {
    return false
  }

  // return true;
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model('User', userSchema);

module.exports = User;
