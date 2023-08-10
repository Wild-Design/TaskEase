import axios, { AxiosResponse } from 'axios';

export const userRegister = async (
  user_name: string,
  email: string,
  password: string
) => {
  try {
    const register: AxiosResponse<string> = await axios.post(
      `http://localhost:3001/user/register`,
      {
        user_name,
        email,
        password,
      }
    );
    return register ? true : false;
    return true;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteTask = async (
  taskId: string,
  user_name: string,
  password: string
) => {
  try {
    await axios.delete<AxiosResponse>(
      `http://localhost:3001/task/${taskId}/${user_name}/${password}`
    );
    return 'Task deleted successfully';
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteList = async (
  listId: string,
  user_name: string,
  password: string
) => {
  try {
    await axios.delete<AxiosResponse>(
      `http://localhost:3001/list/${listId}/${user_name}/${password}`
    );
    return 'List deleted successfully';
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createList = async (
  listName: string,
  UserId: string,
  user_name: string,
  password: string
) => {
  try {
    await axios.post(`http://localhost:3001/list/${listName}`, {
      UserId,
      user_name,
      password,
    });
    return 'List created successfully';
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createTask = async (
  ListId: string,
  user_name: string,
  password: string,
  description: string
) => {
  try {
    await axios.post('http://localhost:3001/task', {
      ListId,
      user_name,
      password,
      description,
    });
    return 'Task created successfully';
  } catch (error: any) {
    console.log(error.message);
  }
};
