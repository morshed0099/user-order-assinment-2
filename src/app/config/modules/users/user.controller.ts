import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userService.createUser(user);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'User not created',
      error: {
        code: 500,
        description: error.message,
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
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};
export const userController = {
  createUser,
  getAllUser,
  updateUser,
};
