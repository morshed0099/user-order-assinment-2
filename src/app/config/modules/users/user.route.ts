import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateUser);
router.get('/:userId/orders', userController.getAllOrder);
router.get('/:userId/orders/total-price',userController.allOrderTotalPrice)
router.put('/:userId/orders', userController.createUserOrder);
router.delete('/:userId', userController.deleteUser);

export const userRouter = router;
