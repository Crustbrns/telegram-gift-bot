import { model, Schema } from 'mongoose';

const historiesSchema = new Schema({
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

export const History = model('Histories', historiesSchema);
