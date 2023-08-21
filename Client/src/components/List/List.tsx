import { FC } from 'react';
import { IList } from '../../interfaces';
import { Task } from '../Task/Task';
import styles from './List.module.css';
import { IoMdAdd } from 'react-icons/io';
import { BsPencil } from 'react-icons/bs';
import ClearListButton from '../ClearListButton/ClearListButton';

interface Props {
  list: IList;
}
const List: FC<Props> = ({ list }) => {
  return (
    <div className={styles.list}>
      <div className={styles.headerContainer}>
        <h3 className={styles.title}>{list.name}</h3>
        <div className={styles.pencilContainer}>
          <BsPencil />
        </div>
      </div>
      <ul className={styles.ul}>
        {list.Tasks?.map((task) => (
          <Task key={task.id} listId={list.id} task={task} />
        ))}
      </ul>
      <div className={styles.finalSection}>
        <div className={styles.addTaskContainer}>
          <IoMdAdd />
          <span className={styles.addParagraph}>Añadir tarea</span>
        </div>
        <ClearListButton list={list} />
      </div>
    </div>
  );
};

export default List;
