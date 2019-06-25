import { Router, Response, Request } from 'express';
import '../models/user';
import { UserModel } from '../models/user/user';
import { mongoose } from '..';
import { AccountBook } from '../models/user/accountBook';

export function apiRoutes(): Router {
  const router = Router();

  router.post(
    '/account-books',
    async (req: Request, res: Response): Promise<Response> => {
      const User = mongoose.model<UserModel>('users');

      const accountBook: AccountBook = req.body;
      const user: UserModel = req.user;

      const updateUser: UserModel = new User(user);

      if (updateUser.accountBooks) {
        updateUser.accountBooks.push(accountBook);
      } else {
        updateUser.accountBooks = [accountBook];
      }

      const save = await User.updateOne({ _id: user._id }, updateUser);
      console.log(save);

      return res.send(accountBook);
    }
  );

  return router;
}
