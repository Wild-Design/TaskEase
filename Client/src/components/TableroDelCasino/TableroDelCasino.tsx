let numeros: number[] = [
  1335, 1336, 1337, 1338, 1339, 1340, 1341, 1342, 1343, 1344, 1345, 1346, 1347,
  1348, 1349, 1350,
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
