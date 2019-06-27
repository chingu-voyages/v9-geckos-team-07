import { Router, Response, Request } from 'express';
import mongoose from 'mongoose';

import '../models/user';

import { UserModel } from '../models/user/user';
import { AccountBook, accountBookSchema } from '../models/user/accountBook';
import { Account, accountSchema, AccountType } from '../models/user/account';

function checkingBookTemplate(): Account[] {
  const Account = mongoose.model<Account>('accounts', accountSchema);
  const { Asset, Equity, Expense } = AccountType;

  const assetAccount: Account = new Account({
    name: 'Assets',
    type: Asset,
    descripton: '',
    placeholder: true,
    parent: null
  });

  const bankAccount: Account = new Account({
    name: 'Checking',
    type: Asset,
    descripton: 'Checking Account',
    placeholder: false,
    parent: assetAccount._id
  });

  const equityAccount: Account = new Account({
    name: 'Equity',
    type: Equity,
    descripton: '',
    placeholder: true,
    parent: null
  });

  const openingBalances: Account = new Account({
    name: 'Opening Balances',
    type: Equity,
    descripton: 'opening balance',
    placeholder: false,
    parent: equityAccount._id
  });

  const expenses: Account = new Account({
    name: 'Expenses',
    type: Expense,
    descripton: 'expenses',
    placeholder: false,
    parent: null
  });

  return [assetAccount, bankAccount, equityAccount, openingBalances, expenses];
}

export function apiRoutes(): Router {
  const router = Router();

  router.post(
    '/account-books',
    async (req: Request, res: Response): Promise<Response> => {
      const User = mongoose.model<UserModel>('users');

      const template: string = req.body.template;

      const accountBook: AccountBook = req.body;

      const user: UserModel = req.user;

      const updateUser: UserModel = new User(user);

      if (template === 'checking') {
        const accounts: Account[] = checkingBookTemplate();

        accountBook.accounts = accounts;
      }

      if (updateUser.accountBooks) {
        const findBook = updateUser.accountBooks.filter(
          book => book.title === accountBook.title
        );

        if (findBook.length) {
          return res.json({ error: 'This Book already exists' });
        }

        updateUser.accountBooks.push(accountBook);
      } else {
        updateUser.accountBooks = [accountBook];
      }

      try {
        await User.updateOne({ _id: user._id }, updateUser);

        return res.send({ accountBook });
      } catch (error) {
        return res.status(500).send({ save: false, error });
      }
    }
  );

  router.delete(
    '/account-books/:id',
    async (req: Request, res: Response): Promise<Response> => {
      const User = mongoose.model<UserModel>('users');
      const id: string = req.params.id;

      const user = await User.findById(req.user._id);

      if (user) {
        user.accountBooks = user.accountBooks.filter(book => book.id !== id);

        const updatedUser = await user.save();

        return res.send(updatedUser.accountBooks);
      }

      return res.send('okay');
    }
  );

  return router;
}
