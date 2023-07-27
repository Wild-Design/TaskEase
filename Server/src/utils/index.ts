import { User } from '../db/db.js';
import bcrypt from 'bcrypt';

export const authenticated = async (user_name: string, password: string) => {
  const searchUserName: any = await User.findOne({
    where: { user_name },
  });
  if (searchUserName) {
    const passwordCompare = await bcrypt.compare(
      password,
      searchUserName.password
    );
    if (passwordCompare) return true;
  }
  return false;
};
