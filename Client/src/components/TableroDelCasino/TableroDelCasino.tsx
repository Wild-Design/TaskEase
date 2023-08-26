let numeros: number[] = [
  2301, 2302, 2303, 2304, 2305, 2306, 2307, 2308, 2309, 2310, 2311, 2312, 2313,
  2314, 2315, 2316, 2317, 2318, 2319, 2320,
];

const TableroDelCasino = () => {
  return (
    <div className='padre'>
      {numeros.map((numero) => (
        <div className='hijos'>{numero}</div>
      ))}
    </div>
  );
};

export default TableroDelCasino;
