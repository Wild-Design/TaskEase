import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser]: any = useState({});

  const url = 'http://localhost:3001/user/login';
  const userName = 'Joaquin';
  const password = 'brenneke1';
  useEffect(() => {
    axios
      .get(`${url}/${userName}/${password}`)
      .then((res) => setUser(res.data));
  }, []);

  return (
    <>
      <h1>Hola Mundo</h1>
      <p>{JSON.stringify(user)}</p>

      {user?.Lists?.map((list: any) => (
        <div
          style={{ width: '300px', height: '300px', border: '1px solid #000' }}
        >
          <h3>{list.name}</h3>
          
        </div>
      ))}
    </>
  );
}

export default App;
