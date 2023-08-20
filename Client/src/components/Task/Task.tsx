import { FC, useState } from 'react';
import { ITask } from '../../interfaces';
import styles from './Task.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';

interface Props {
  task: ITask;
  listId: string;
}

export const Task: FC<Props> = ({ task }) => {
  const [taskHover, setTaskHover] = useState(false);

  const handleHover = () => {
    setTaskHover(true);
  };
  const handleLeave = () => {
    setTaskHover(false);
  };
  return (
    <li
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className={styles.liContainer}
    >
      <p className={styles.liContent}>{task.description}</p>
      {taskHover ? (
        <div
          className={`${styles.iconsContainer} ${
            taskHover && styles.taskHover
          }`}
        >
          <RiDeleteBinLine />
        </div>
      ) : (
        ''
      )}
    </li>
  );
};
