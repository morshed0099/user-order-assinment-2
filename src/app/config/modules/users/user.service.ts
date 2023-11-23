import { User } from '../user.model';
import { Tuser } from './user.interface';

const createUser = async (user: Tuser) => {
  const result = await User.create(user);
  return result;
};

const getAlluser = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: number) => {
  const result = await User.findOne({ userId: id });
  return result;
};

const updateUser = async (id: number, userData: Tuser) => {
  const result = await User.updateOne({ userId: id }, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleUser = async (id: number) => {
  const result = await User.deleteOne({ userId: id });
  return result;
};

export const userService = {
  createUser,
  getAlluser,
  getSingleUser,
  updateUser,
  deleUser,
};
