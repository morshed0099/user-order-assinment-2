import { Schema, model } from 'mongoose';
import { Taddress, Torder, Tuser } from './users/user.interface';

const addressSchema = new Schema<Taddress>({
  city: { type: String, required: [true, 'city is required'] },
  street: { type: String, required: [true, 'street is required'] },
  country: { type: String, required: [true, 'country is required'] },
});

const orderSchema = new Schema<Torder>({
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  productName: {
    type: String,
    required: [true, 'product name is required'],
  },
});

const userSchema = new Schema<Tuser>({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'user name is required and must be unique'],
    max: [60, 'name lennth not bigger than 40 charekter'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'first name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'last name is requird'],
      trim: true,
    },
  },
  address: {
    type: addressSchema,
    required: [true, 'address is required'],
  },
  hobbies: [
    {
      type: String,
      required: [true, 'hobbie is required'],
    },
  ],
  order: [
    {
      type: orderSchema,
    },
  ],
  userId: {
    type: Number,
    unique: true,
    required: [true, 'userId is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
  },
  age: {
    type: Number,
    required: [true, 'age is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
    required: [true, `{VALUE} is wrong !! will be true or false nothing else`],
  },
});

export const User = model<Tuser>('User', userSchema);
