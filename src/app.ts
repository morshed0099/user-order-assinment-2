import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/config/modules/users/user.route';
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'sucess',
  });
});

export default app;
