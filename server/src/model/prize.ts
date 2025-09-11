import { model, Schema } from 'mongoose';

interface IPrize {
  id: string;
  name: string;
  cost: number;
  droprate: number;
  created_on: Date;
}

const prizesSchema = new Schema<IPrize>({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  droprate: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
});

export const Prize = model<IPrize>('Prizes', prizesSchema);
