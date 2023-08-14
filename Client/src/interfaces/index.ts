export interface IFullDataUser {
  id: string;
  user_name: string;
  email: string;
  password: string;
  first_name: null;
  last_name: null;
  age: null;
  Lists: IList[];
}

export interface IList {
  id: string;
  name: string;
  UserId: string;
  Tasks: ITask[];
}

export interface ITask {
  id: string;
  description: string;
}
