import { model, Schema } from 'mongoose';
import { type IUser } from './user.ts';
import { type IPrize } from './prize.ts';

export interface IHistory {
  userId: IUser;
  prize: IPrize;
  rollType: string;
  recordedOn: Date;
}

const historiesSchema = new Schema<IHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prize: {
    type: Schema.Types.ObjectId,
    ref: 'Prize',
    required: true,
  },
  rollType: {
    type: String,
    required: true,
  },
  recordedOn: {
    type: Date,
    default: Date.now,
  },
});

export const History = model<IHistory>('Histories', historiesSchema);
