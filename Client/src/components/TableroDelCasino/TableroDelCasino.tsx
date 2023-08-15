let numeros = [
  2961, 2962, 2963, 2964, 2965, 2966, 2967, 2968, 2969, 2970, 2971, 2972, 2973,
  2974, 2975, 2976, 2977, 2978, 2979, 2980, 2981, 2982, 2983, 2984, 2985, 2986,
  2987, 2988, 2989, 2990, 2991, 2992, 2993, 2994, 2995, 2996, 2997, 2998, 2999,
  3000,
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
