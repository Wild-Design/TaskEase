import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../utils';
import { Helmet } from 'react-helmet';

const Register: FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ user_name: '', email: '', password: '' });

  const handleInputChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { user_name, email, password } = data;
    const register = await userRegister(user_name, email, password);
    if (register === true) return navigate('/login');
    if (register === 'This username is already in use')
      alert('Ya existe un usuario con ese mismo nombre');
    if (register === 'This email is already in use')
      alert('Este email ya se encuentra en uso');
    else alert('No se pudo registrar el usuario');
  };
  return (
    <>
      <Helmet>
        <title>Crea tu cuenta en TaskEase</title>
        <meta name='description' content='Registrate en TaskEae' />
      </Helmet>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type='text'
          name='user_name'
          placeholder='UserName'
        />
        <input
          onChange={handleInputChange}
          type='text'
          name='email'
          placeholder='Email'
        />
        <input
          onChange={handleInputChange}
          type='password'
          name='password'
          placeholder='Password'
        />
        <input onChange={handleInputChange} type='submit' value='Registrar' />
      </form>
    </>
  );
};

export default Register;
