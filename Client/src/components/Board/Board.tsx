import { useAppSelector } from '../../app/hooks';
import AddNewList from '../AddNewList/AddNewList';
import List from '../List/List';
import styles from './Board.module.css';
import { DndContext, closestCenter } from '@dnd-kit/core';

const Board = () => {
  const { fullData } = useAppSelector((state) => state.userSlice);

  const handleDragEnd = (): void => {};
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className={styles.board}>
        {fullData?.Lists?.map((list) => (
          <List key={list.id} list={list} />
        ))}
        <AddNewList />
      </div>
    </DndContext>
  );
};

export default Board;
