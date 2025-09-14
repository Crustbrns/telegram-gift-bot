import { model, Schema } from 'mongoose';

const rollsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  prizes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Prize',
    },
  ],
  cost: {
    type: Number,
    required: true,
  },
});

export const Roll = model('Rolls', rollsSchema);
