import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Board from '../../components/Board/Board';
import styles from './Home.module.css';
// import NavBar from '../../components/NavBar/NavBar';

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
      {/* <NavBar /> */}
      <button onClick={() => navigate('/login')}>Login</button>
      <div className={styles.homeContainer}>
        <Board />
      </div>
    </>
  );
};

export default Home;
