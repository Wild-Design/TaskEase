export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserDb extends User {
  id: string;
}
