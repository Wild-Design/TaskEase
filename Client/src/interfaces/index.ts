export interface IFullDataUser {
  id: string;
  user_name: string;
  email: string;
  password: string;
  first_name: null;
  last_name: null;
  age: null;
  Lists: List[];
}

export interface List {
  id: string;
  name: string;
  UserId: string;
  Tasks: Task[];
}

export interface Task {
  id: string;
  description: string;
}
