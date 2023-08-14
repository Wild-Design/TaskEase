import { FC, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [data, setData] = useState({ user_name: '', password: '' });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { user_name, password } = data;
    const dispatchFullData = await dispatch(
      getFullDataUser(user_name, password)
    );
    if (dispatchFullData) navigate('/home');
    else return false;
  };
  return (
    <>
      <Helmet>
        <title>Inicio de Sesión</title>
        <meta
          name='description'
          content='Inicia sesión para acceder a TaskEase'
        />
      </Helmet>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type='text'
          name='user_name'
          placeholder='UserName'
        />
        <input
          onChange={handleInputChange}
          type='password'
          name='password'
          placeholder='Password'
        />
        <input type='submit' value='Login' />
      </form>
    </>
  );
};

export default Login;
