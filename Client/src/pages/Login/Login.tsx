import { FC, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styles from './Login.module.css';
import { BiUser } from 'react-icons/bi';
import { SlLock } from 'react-icons/sl';

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
          content='Inicia sesión para acceder a tus datos de TaskEase'
        />
      </Helmet>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Inicio de sesión</h3>
          <div className={styles.inputsContainer}>
            <label htmlFor='userName'>
              <BiUser />
            </label>
            <input
              onChange={handleInputChange}
              type='text'
              name='user_name'
              placeholder='UserName'
              id='userName'
            />
          </div>
          <div className={styles.inputsContainer}>
            <label htmlFor='password'>
              <SlLock />
            </label>
            <input
              onChange={handleInputChange}
              type='password'
              name='password'
              placeholder='Password'
              id='password'
            />
          </div>
          <input type='submit' value='Acceder' />
        </form>
      </div>
    </>
  );
};

export default Login;
