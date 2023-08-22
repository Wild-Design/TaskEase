import { FC } from 'react';
import { IList } from '../../interfaces';
import { Task } from '../Task/Task';
import styles from './List.module.css';
import { BsPencil } from 'react-icons/bs';

import FinalListSection from '../FinalListSection/FinalListSection';

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
      <FinalListSection list={list} />
    </div>
  );
};

export default List;
