import { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styles from './Login.module.css';
import { BiUser } from 'react-icons/bi';
import { SlLock } from 'react-icons/sl';
import { BsEyeSlash } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { RotatingLines } from 'react-loader-spinner';

const Login: FC = () => {
  const oppsAlert = (text: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    });
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [data, setData] = useState({ user_name: '', password: '' });
  const [errors, setErrors] = useState({
    user_name: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const usernameRegex = /^(?!.*\s.*\s)[a-zA-Z ]{6,20}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,20}$/;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    let newErrors = { ...errors };
    if (name === 'user_name') {
      newErrors.user_name = !usernameRegex.test(value)
        ? 'Debe contener al menos 6 letras y maximo 20'
        : '';
    }
    if (name === 'password') {
      newErrors.password = !passwordRegex.test(value)
        ? 'Debe contener al menos 6 caracteres y maximo 20, al menos una mayuscula y al menos un numero'
        : '';
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { user_name, password } = data;
    if (!usernameRegex.test(user_name) || !passwordRegex.test(password)) {
      oppsAlert(
        'Completa correctamente los datos del formulario antes de continuar'
      );
    } else {
      setLoading(true);
      const dispatchFullData = await dispatch(
        getFullDataUser(user_name, password)
      );
      if (!dispatchFullData) {
        setLoading(false);
        oppsAlert('Usuario o contraseña incorrectos');
      } else {
        setLoading(false);
        navigate('/home');
      }
    }
  };

  const [hiddenPassword, setHiddenPassword] = useState('password');
  const handleHiddenPassword = () => {
    hiddenPassword === 'password'
      ? setHiddenPassword('text')
      : setHiddenPassword('password');
  };

  return (
    <>
      <Helmet>
        <title>Inicio de Sesión</title>
        <meta
          name='description'
          content='Inicia sesión para acceder a tus notas en TaskEase'
        />
      </Helmet>
      <div className={styles.container}>
        <h1>TaskEase</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Inicio de sesión</h2>
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
          <p className={styles.error}>{errors.user_name}</p>
          <div className={styles.inputsContainer}>
            <label htmlFor='password'>
              <SlLock />
            </label>
            <input
              onChange={handleInputChange}
              type={hiddenPassword}
              name='password'
              placeholder='Password'
              id='password'
            />
            <div className={styles.eyeContainer} onClick={handleHiddenPassword}>
              <BsEyeSlash />
            </div>
          </div>
          <p className={styles.error}>{errors.password}</p>
          <input type='submit' value='Acceder' />
        </form>
        {loading && (
          <div className={styles.loaderContainer}>
            <RotatingLines
              strokeColor='#fff'
              strokeWidth='3'
              animationDuration='0.75'
              width='250'
              visible={true}
            />
            <p>Por favor esperá un toke</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
