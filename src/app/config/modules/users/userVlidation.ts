import { z } from 'zod';

const addressValidationSchema = z.object({
  city: z.string().min(2),
  street: z.string().min(2),
  country: z.string().min(3),
});

const orderValidateSchema = z.object({
  quantity: z.number(),
  price: z.number(),
  productName: z.string(),
});

export const userValidationSchema = z.object({
  username: z
    .string({ required_error: 'user name is required' })
    .max(60, 'user name not be gather than 60')
    .trim(),
  fullName: z.object({
    firstName: z.string().min(2).trim(),
    lastName: z.string().min(2).trim(),
  }),
  address: addressValidationSchema,
  hobbies: z.array(z.string().nonempty()),
  order: z.array(orderValidateSchema).optional(),
  userId: z.number().int().positive(),
  email: z
    .string({ required_error: 'email is required and must be unique' })
    .email({message:"email is required and email formet is not valid"}),
  age: z.number(),
  isActive: z.boolean().default(true),
});

export default userValidationSchema;
