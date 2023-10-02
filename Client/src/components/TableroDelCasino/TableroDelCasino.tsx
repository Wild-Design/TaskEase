import { useState } from 'react';
import styles from './estilos.module.css';

const TableroDelCasino = () => {
  const [width, setWidth] = useState(400);
  const [desde, setDesde] = useState(100);
  const [hasta, setHasta] = useState(200);
  const handleRangeChange = (event: any): void => {
    setWidth(event.target.value);
  };

  let numbers: number[] = [];
  for (let i = desde; i <= hasta; i++) {
    numbers.push(i);
  }
  return (
    <>
      <input type='range' min={100} max={1500} onChange={handleRangeChange} />
      <div>
        <label>
          Desde{' '}
          <input
            type='text'
            onChange={(event: any) => setDesde(event.target.value)}
          />
        </label>
        <label>
          Hasta{' '}
          <input
            type='text'
            onChange={(event: any) => setHasta(event.target.value)}
          />
        </label>
      </div>

      <div className={styles.padre} style={{ width: `${width}px` }}>
        {numbers.map((numero) => (
          <div key={numero} className={styles.hijos}>
            {numero}
          </div>
        ))}
      </div>
    </>
  );
};

export default TableroDelCasino;
