import { model, Schema } from 'mongoose';

export interface IUser {
  tgId: string;
  username: string;
  firstname: string;
  lastname: string;
  photoURL: string;
  allowToWrite: boolean;
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
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  allowToWrite: {
    type: Boolean,
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
