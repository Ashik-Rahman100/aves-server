import { Schema, model } from 'mongoose';
import { TProperty } from './property.interface';

const propertySchema = new Schema<TProperty>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['House', 'Apartment', 'Commercial'], // Add other types if needed
    required: true,
  },
  status: {
    type: String,
    enum: ['Rented', 'Available'], // Add other statuses if needed
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Invalid email format'], // Ensures valid email format
  },
  size: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    required: false,
  },
  checkOut: {
    type: Date,
    required: false,
  },
});

export const Property = model<TProperty>('Property', propertySchema);
