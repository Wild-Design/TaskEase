let numeros = [
  2661, 2662, 2663, 2664, 2665, 2666, 2667, 2668, 2669, 2670, 2671, 2672, 2673,
  2674, 2675, 2676, 2677, 2678, 2679, 2680, 2681, 2682, 2683, 2684, 2685, 2686,
  2687, 2688, 2689, 2690, 2691, 2692, 2693, 2694, 2695, 2696, 2697, 2698, 2699,
  2700, 2701, 2702, 2703, 2704, 2705, 2706, 2707, 2708, 2709, 2710,
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
