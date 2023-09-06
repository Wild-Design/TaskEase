import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import TableroDelCasino from './components/TableroDelCasino/TableroDelCasino';
import { Helmet } from 'react-helmet';

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Helmet>
                <title>TaskEase</title>
                <meta name='description' content='Pagina inicial de TaskEase' />
              </Helmet>
              <h1>LandingPage</h1>
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
