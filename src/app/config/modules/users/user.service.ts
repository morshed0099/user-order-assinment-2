import { User } from '../user.model';
import { Torder, Tuser } from './user.interface';

const createUser = async (user: Tuser) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error('user alredy exits');
  }
  const result = await User.create(user);
  return result;
};

const getAlluser = async () => {
  const result = await User.find().select({ order: 0, password: 0 });
  return result;
};

const getSingleUser = async (id: number) => {
  const result = await User.findOne({ userId: id }).select({
    order: 0,
    password: 0,
  });
  return result;
};

const updateUser = async (id: number, userData: Tuser) => {
  if (!(await User.isUserExists(id))) {
    throw new Error('user not found');
  }
  const result = await User.findOneAndUpdate({ userId: id }, userData, {
    new: true,
    runValidators: true,
  }).select({ order: 0, password: 0 });
  return result;
};
const deleUser = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('user not found");
  }
  const result = await User.deleteOne({ userId: userId });
  return result;
};

const createUserOrder = async (userId: number, order: Torder) => {
  const orderWithUserId = {
    ...order,
    userId,
  };
  const result = User.findOneAndUpdate(
    { userId: userId },
    { $push: { order: orderWithUserId } },
    {
      new: true,
    },
  );
  return result;
};

const getAllOrders = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('user not found');
  }
  const result = User.find({ userId });
  return result;
};

const getAllOrder = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('user not found');
  }
  const result = User.find({ userId: userId }, 'order -_id');
  return result;
};

const allOrdersTotalPrice = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('user not found');
  }
  const result = User.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$order' },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$order.price' },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);

  return result;
};

export const userService = {
  createUser,
  getAlluser,
  getSingleUser,
  updateUser,
  deleUser,
  createUserOrder,
  getAllOrders,
  getAllOrder,
  allOrdersTotalPrice,
};
