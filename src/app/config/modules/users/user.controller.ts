import { Request, Response } from 'express';
import { userService } from './user.service';
import { Tuser } from './user.interface';
import userValidationSchema from './userVlidation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user: Tuser = req.body;
    const zodParseData = userValidationSchema.parse(user);
    const result = await userService.createUser(zodParseData);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
  
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userService.deleUser(userId);
    res.status(200).send({
      success: true,
      message: 'user deleted successfully !!',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'user not found',
      error: {
        code: 404,
        description: error.message,
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
    if (result) {
      res.status(200).json({
        success: true,
        message: 'order created succefully',
        data: null,
      });
    }
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

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const orders = await userService.getAllOrder(userId);

    res.status(200).json({
      success: true,
      message: 'all order fetched !!',
      data: orders,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'order not found',
      error: {
        code: 404,
        description: error.message,
        error,
      },
    });
  }
};

const allOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userService.allOrdersTotalPrice(userId);
    if(result.length===0){
      res.status(200).json({
        success: true,
        message: ' user not yet order any product',
        data: 'no order found',
      });
    }
    res.status(200).json({
      success: true,
      message: ' Total price calculated successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'order not found',
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
  deleteUser,
  getAllOrder,
  allOrderTotalPrice
};
