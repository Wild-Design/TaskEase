import { useAppSelector } from '../../app/hooks';
import AddNewList from '../AddNewList/AddNewList';
import List from '../List/List';
import styles from './Board.module.css';

const Board = () => {
  const { fullData } = useAppSelector((state) => state.userSlice);
  return (
    <div className={styles.board}>
      {fullData?.Lists?.map((list) => (
        <List key={list.id} list={list} />
      ))}
      <AddNewList />
    </div>
  );
};

export default Board;
