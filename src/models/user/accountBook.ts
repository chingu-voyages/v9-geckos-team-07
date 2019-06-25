import { Schema } from 'mongoose';

const accountBookSchema: Schema = new Schema({
  title: String,
  description: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  accounts: []
});

accountBookSchema.pre('update', function preUpdate(next): void {
  this.update({}, { $currentDate: { updated: true } });
  next();
});

export { accountBookSchema };
