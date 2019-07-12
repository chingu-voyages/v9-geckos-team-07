import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

export interface EmailModel extends Document {
  id: string;
  value: string;
}

export const emailSchema = new Schema<EmailModel>({
  value: String
});
