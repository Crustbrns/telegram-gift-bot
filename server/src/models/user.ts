import { model, Schema } from 'mongoose';

export interface IUser {
  tgId: string;
  username: string;
  name: string;
  languageCode: string;
  balance: number;
}

const usersSchema = new Schema<IUser>({
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

export const User = model<IUser>('User', usersSchema);
