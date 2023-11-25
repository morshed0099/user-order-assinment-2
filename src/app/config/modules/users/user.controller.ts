import { Request, Response } from 'express';
import { userService } from './user.service';
import { Tuser } from './user.interface';
import userValidationSchema from './userVlidation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user: Tuser = req.body;
    const zodParseData = userValidationSchema.parse(user);
    const result = await userService.createUser(zodParseData);
    console.log(result)
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'User not created',
      error: {
        code: 500,
        error: error.message,
        description: error.message || 'something went wrong',
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAlluser();
    res.status(201).json({
      success: true,
      message: 'Users fetched successfully!!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'User found created',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};


const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);

    const userData = req.body;
    const result = await userService.updateUser(id, userData);
    if (!result) {
      res.status(404).json({
        success: 'false',
        message: 'user not found',
        error: {
          error: '404',
          description: 'User not found!',
        },
      });
    }
    res.status(201).json({
      success: true,
      message: 'Users updated successfully!!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
        error,
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);

    const result = await userService.getSingleUser(id);
    if (!result) {
      res.status(404).json({
        success: 'false',
        message: 'user not found',
        error: {
          error: '404',
          description: 'User not found!',
        },
      });
    }
    res.status(201).json({
      success: true,
      message: 'Users updated successfully!!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
        error,
      },
    });
  }
};


const createUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const order = req.body;
    console.log(userId, order);

    const result = await userService.createUserOrder(userId, order);
    res.status(200).json({
      success: true,
      message: 'order created succefully',
      data: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
        error,
      },
    });
  }
};
export const userController = {
  createUser,
  getAllUser,
  updateUser,
  getSingleUser,
  createUserOrder,
};
