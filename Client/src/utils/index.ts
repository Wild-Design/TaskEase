import axios, { AxiosResponse } from 'axios';

export const userRegister = async (
  user_name: string,
  email: string,
  password: string
) => {
  try {
    const register: AxiosResponse<string> = await axios.post(
      // `http://localhost:3001/user/register`,
      `https://taskeaseserver.onrender.com/user/register`,
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
      // `http://localhost:3001/task/${taskId}/${user_name}/${password}`
      `https://taskeaseserver.onrender.com/task/${taskId}/${user_name}/${password}`
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
      // `http://localhost:3001/list/${listId}/${user_name}/${password}`
      `https://taskeaseserver.onrender.com/list/${listId}/${user_name}/${password}`
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
    // await axios.post(`http://localhost:3001/list/${listName}`, {
    await axios.post(`https://taskeaseserver.onrender.com/list/${listName}`, {
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
    // await axios.post('http://localhost:3001/task', {
    await axios.post('https://taskeaseserver.onrender.com/task', {
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
) => {
  try {
    // await axios.put(`http://localhost:3001/task/${taskId}`, {
    await axios.put(`https://taskeaseserver.onrender.com/task/${taskId}`, {
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
) => {
  try {
    // await axios.put(`http://localhost:3001/list/${listId}`, {
    await axios.put(`https://taskeaseserver.onrender.com/list/${listId}`, {
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
) => {
  try {
    await axios.put(
      // `http://localhost:3001/task/${taskId}/${destinationListId}`,
      `https://taskeaseserver.onrender.com/${taskId}/${destinationListId}`,
      { user_name, password }
    );
    return 'Task transferred successfully';
  } catch (error: any) {
    console.log(error.message);
  }
};
