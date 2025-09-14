import { model, Schema } from 'mongoose';

const usersSchema = new Schema({
  tgId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  languageCode: {
    type: String,
    default: 'en',
  },
  balance: {
    type: Number,
    min: 0,
    default: 0,
  },
});

export const User = model('Users', usersSchema);
