import axios, { AxiosResponse } from 'axios';

export const userRegister = async (
  user_name: string,
  email: string,
  password: string
): Promise<boolean | string> => {
  try {
    const register: AxiosResponse<string> = await axios.post(
      `http://localhost:3401/user/register`,
      // `https://taskeaseserver.onrender.com/user/register`,
      {
        user_name,
        email,
        password,
      }
    );
    return register ? true : false;
  } catch (error: any) {
    console.log(error);

    return error;
  }
};

export const deleteTask = async (
  taskId: string,
  user_name: string,
  password: string
): Promise<string | undefined> => {
  try {
    await axios.delete<AxiosResponse>(
      `http://localhost:3401/task/${taskId}/${user_name}/${password}`
      // `https://taskeaseserver.onrender.com/task/${taskId}/${user_name}/${password}`
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
): Promise<string | undefined> => {
  try {
    await axios.delete<AxiosResponse>(
      `http://localhost:3401/list/${listId}/${user_name}/${password}`
      // `https://taskeaseserver.onrender.com/list/${listId}/${user_name}/${password}`
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
): Promise<string | undefined> => {
  try {
    await axios.post(`http://localhost:3401/list/${listName}`, {
      // await axios.post(`https://taskeaseserver.onrender.com/list/${listName}`, {
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
): Promise<string | undefined> => {
  try {
    await axios.post('http://localhost:3401/task', {
      // await axios.post('https://taskeaseserver.onrender.com/task', {
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

export const updateTask = async (
  taskId: string,
  user_name: string,
  password: string,
  description: string
): Promise<string | undefined> => {
  try {
    await axios.put(`http://localhost:3401/task/${taskId}`, {
      // await axios.put(`https://taskeaseserver.onrender.com/task/${taskId}`, {
      user_name,
      password,
      description,
    });
    return 'Task updated successfully';
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateList = async (
  listId: string,
  user_name: string,
  password: string,
  description: string
): Promise<string | undefined> => {
  try {
    await axios.put(`http://localhost:3401/list/${listId}`, {
      // await axios.put(`https://taskeaseserver.onrender.com/list/${listId}`, {
      user_name,
      password,
      description,
    });
    return 'List updated successfully';
  } catch (error: any) {
    console.log(error.message);
  }
};

export const transferTask = async (
  taskId: string,
  destinationListId: string,
  user_name: string,
  password: string
): Promise<string | undefined> => {
  try {
    await axios.put(
      `http://localhost:3401/task/${taskId}/${destinationListId}`,
      // `https://taskeaseserver.onrender.com/${taskId}/${destinationListId}`,
      { user_name, password }
    );
    return 'Task transferred successfully';
  } catch (error: any) {
    console.log(error.message);
  }
};
