import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { deleteTask } from './utils';

function App() {
  const handleCoso = async () => {
    const coso = await deleteTask(
      '95d6669b-3dff-4915-9c3f-45ac789ef28b',
      'Joaquin',
      'brenneke1'
    );
    coso
      ? alert(`Se borro correctamente la tarea \n ${coso}`)
      : alert('No se borro un choto');
  };
  return (
    <>
      <h1 style={{ cursor: 'pointer' }} onClick={handleCoso}>
        Consume
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
