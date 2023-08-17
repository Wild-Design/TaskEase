import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Board from '../../components/Board/Board';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>TaskEase</title>
        <meta
          name='description'
          content='Crea tus tareas, organisa tu día a día'
        />
      </Helmet>
      <button onClick={() => navigate('/login')}>Login</button>
      <div>
        <h2>Home</h2>
        <Board />
      </div>
    </>
  );
};

export default Home;
