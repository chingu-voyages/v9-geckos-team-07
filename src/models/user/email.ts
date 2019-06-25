import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

export interface Email extends Document {
  value: string;
}

export const emailSchema = new Schema<Email>({
  value: String
});
