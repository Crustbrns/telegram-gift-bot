import { model, Schema } from 'mongoose';

const prizesSchema = new Schema({
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

export const Prize = model('Prizes', prizesSchema);
