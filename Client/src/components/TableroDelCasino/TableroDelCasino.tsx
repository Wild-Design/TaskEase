let numbers: number[] = [];

for (let i = 551; i <= 600; i++) {
  numbers.push(i);
}

const TableroDelCasino = () => {
  return (
    <div className='padre'>
      {numbers.map((numero) => (
        <div className='hijos'>{numero}</div>
      ))}
    </div>
  );
};

export default TableroDelCasino;
