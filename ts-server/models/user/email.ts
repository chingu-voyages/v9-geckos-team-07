import mongoose from 'mongoose'

const { Schema } = mongoose

export type Email = {
  value: string
}

export const emailSchema = new Schema<Email>({
  value: String
})