import { z } from 'zod';

const createPropertyValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    type: z.enum(['House', 'Apartment', 'Commercial']), // Restricts to predefined values
    status: z.enum(['Rented', 'Available']), // Restricts to predefined values
    location: z.string(),
    rent: z.number(),
    owner: z.string(),
    contact: z.string().email('Invalid email format'), // Ensures a valid email format
    size: z.string(),
    checkIn: z
      .string()
      .nullable()
      .refine((date) => date === null || !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
      }), // Ensures the string is a valid date
    checkOut: z
      .string()
      .nullable()
      .refine((date) => date === null || !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
      }), // Ensures the string is a valid date
  }),
});

export const PropertyValidations = {
  createPropertyValidationSchema,
};
