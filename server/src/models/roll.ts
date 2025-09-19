import { model, Schema } from 'mongoose';
import { type IPrize } from './prize.js';

export interface IRoll {
  name: string;
  prizes: [IPrize];
  cost: number;
}

const rollsSchema = new Schema<IRoll>({
  name: {
    type: String,
    required: true,
  },
  prizes: [{
    type: Schema.Types.ObjectId,
    ref: 'Prize',
  }],
  cost: {
    type: Number,
    required: true,
  }
});

export const Roll = model<IRoll>('Roll', rollsSchema);
