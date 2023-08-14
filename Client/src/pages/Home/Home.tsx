import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name='description'
          content='Crea tus tareas, organisa tu día a día'
        />
      </Helmet>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button>
      <div>
        <h2>Home</h2>
      </div>
    </>
  );
};

export default Home;
