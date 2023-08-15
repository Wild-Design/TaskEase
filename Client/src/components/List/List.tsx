import { FC } from 'react';
import { IList } from '../../interfaces';
import { Task } from '../Task/Task';
import styles from './List.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';

interface Props {
  list: IList;
}
const List: FC<Props> = ({ list }) => {
  return (
    <div className={styles.list}>
      <h3 className={styles.title}>{list.name}</h3>
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
        <div className={styles.deleteContainer}>
          <RiDeleteBinLine />
        </div>
      </div>
    </div>
  );
};

export default List;
