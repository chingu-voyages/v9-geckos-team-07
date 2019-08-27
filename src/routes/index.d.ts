import { UserModel } from '../models/user/user';

declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}
