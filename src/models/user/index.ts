import mongoose from 'mongoose';

import { userSchema } from './user';

mongoose.model('users', userSchema);
