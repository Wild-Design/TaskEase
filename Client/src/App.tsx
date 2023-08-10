import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { createTask } from './utils';

function App() {
  const handleCoso = async () => {
    const coso = await createTask(
      'EL DROGADICTO WILD',
      'e18d2fa7-b98c-4a80-9efb-bc3f8efc1caa',
      'Joaquin',
      'brenneke1'
    );
    coso
      ? alert(`Lista creada correctamente \n ${coso}`)
      : alert('No se creo un choto');
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
