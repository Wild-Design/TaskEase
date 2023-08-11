import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { transferTask } from './utils';

function App() {
  const updated = async () => {
    const UPDATED = await transferTask(
      '5a86caf2-e966-4ac4-a3d0-d8704af7cda4',
      'aa4cbf49-0ab4-49f2-8681-80f4d024690f',
      'Joaquin',
      'sumsum'
    );
    UPDATED ? alert('Tarea movida correctamente') : alert('No');
  };
  return (
    <>
      <h1 onClick={updated} style={{ cursor: 'pointer' }}>
        Probar
      </h1>
      <Link to='/login'>
        <button>Login</button>
      </Link>
      <Routes>
        <Route path='/' element={<h1>Hola Mundo!</h1>} />
        <Route path='/home' element={<Home />} />
        <Route path='/pibe' element={<h1>Hola pibe</h1>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
