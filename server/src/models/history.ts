import { model, Schema } from 'mongoose';
import { type IUser } from './user.js';
import { type IPrize } from './prize.js';
import type { IRoll } from './roll.js';

export interface IHistory {
  user: IUser;
  prize: IPrize;
  chance: number;
  roll: IRoll;
  recordedOn: Date;
}

const historiesSchema = new Schema<IHistory>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prize: {
    type: Schema.Types.ObjectId,
    ref: 'Prize',
    required: true,
  },
  chance: {
    type: Number,
    required: true,
  },
  roll: {
    type: Schema.Types.ObjectId,
    ref: 'Roll',
    required: true,
  },
  recordedOn: {
    type: Date,
    default: Date.now,
  },
});

export const History = model<IHistory>('History', historiesSchema);
