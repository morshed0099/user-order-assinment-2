import { Model} from 'mongoose';

export interface Taddress {
  city: string;
  street: string;
  country: string;
}
export interface Torder {
  price: number;
  quantity: number;
  productName: string;
}
export interface Tuser {
  userId: number;
  username: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Taddress;
  order: Torder[];
}

export type UserMethod ={
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<Tuser | null>;
};
export type UserModel = Model<Tuser, Record<string, never>, UserMethod>;
