import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import TableroDelCasino from './components/TableroDelCasino/TableroDelCasino';

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <h1>Hola Mundo!</h1>
              <button onClick={() => navigate('/home')}>Home</button>
            </>
          }
        />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/casino' element={<TableroDelCasino />} />
      </Routes>
    </>
  );
}

export default App;
