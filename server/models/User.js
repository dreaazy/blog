const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true //email unica
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  profilePicture: {
    type: String
  }
});

// Pre-save hook to update the `updatedAt` field
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema, "Users");

module.exports = User;
