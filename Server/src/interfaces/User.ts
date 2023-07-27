import { Model } from 'sequelize';
export interface IUser {
  user_name: string;
  email: string;
  password: string | number;
}

export interface IUserModel extends Model {
  id: string;
  user_name: string;
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
  age: number | null;
}
