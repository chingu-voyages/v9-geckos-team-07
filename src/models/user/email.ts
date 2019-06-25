import mongoose from 'mongoose';

const { Schema } = mongoose;

export const emailSchema = new Schema({
  value: String
});
