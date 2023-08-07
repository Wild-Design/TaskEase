import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<h1>Hola Mundo!</h1>} />
        <Route path='/pibe' element={<h1>Hola pibe</h1>} />
      </Routes>
    </>
  );
}

export default App;
