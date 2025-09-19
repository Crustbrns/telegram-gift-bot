import { model, Schema } from 'mongoose';

export interface IPrize {
  name: string;
  cost: number;
  hash: string;
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
    min: 0,
  },
  hash: {
    type: String,
    unique: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export const Prize = model<IPrize>('Prize', prizesSchema);
