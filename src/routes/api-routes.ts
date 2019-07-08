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
      const AccountBook = mongoose.model<AccountBook>(
        'accountbooks',
        accountBookSchema
      );
      const template: string = req.body.template;
      const accountBook: AccountBook = req.body;
      const user: UserModel = req.user;
      const updateUser: UserModel = new User(user);
      let book: AccountBook;

      if (updateUser.accountBooks) {
        const findBook = updateUser.accountBooks.find(
          book => book.title === accountBook.title
        );

        if (findBook) {
          return res.status(200).json({ error: 'This Book already exists' });
        }

        book = new AccountBook(accountBook);

        if (template === 'checking') {
          const accounts: Account[] = checkingBookTemplate();

          book.accounts = accounts;
        }

        updateUser.accountBooks.push(book);
      } else {
        book = new AccountBook(accountBook);
        updateUser.accountBooks = [book];
      }

      try {
        await User.updateOne({ _id: user._id }, updateUser);

        return res.status(201).send({ accountBook: book });
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

        const updateUser = await user.save();

        const wasDelted = !updateUser.accountBooks.find(book => book.id === id);

        return res.status(200).send(wasDelted);
      }

      return res.status(404).json({ error: 'Account Book was not found' });
    }
  );

  router.post(
    '/account-books/:id/accounts',
    async (req: Request, res: Response): Promise<void> => {
      const Account = mongoose.model<Account>('accounts', accountSchema);
      const account = new Account(req.body);

      const user: UserModel = req.user;

      const accountBookId: string = req.params.id;

      const accountBook = user.accountBooks.find(
        book => book.id === accountBookId
      );

      if (accountBook) {
        accountBook.accounts.push(account);
      }

      await user.save();

      res.status(201).json(account);
    }
  );

  return router;
}
