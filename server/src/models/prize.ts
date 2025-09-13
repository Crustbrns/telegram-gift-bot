import { model, Schema } from 'mongoose';

export interface IPrize {
  name: string;
  cost: number;
  createdOn: Date;
}

const prizesSchema = new Schema<IPrize>({
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
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export const Prize = model<IPrize>('Prizes', prizesSchema);
