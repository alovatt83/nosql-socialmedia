const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Please provide a username!',
      trim: true
     },
     email: {
      type: String,
      lowercase: true,
      unique: true,
      required: 'Please provide an email!',
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/],
      trim: true
     },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;