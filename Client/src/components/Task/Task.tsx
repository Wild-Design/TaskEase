import { FC } from 'react';
import { ITask } from '../../interfaces';
import styles from './Task.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';

interface Props {
  task: ITask;
  listId: string;
}

export const Task: FC<Props> = ({ task }) => {
  return (
    <li className={styles.liContainer}>
      <p className={styles.liContent}>{task.description}</p>
      <div className={styles.iconsContainer}>
        <RiDeleteBinLine />
      </div>
    </li>
  );
};
