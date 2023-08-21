import { FC, useState } from 'react';
import { ITask } from '../../interfaces';
import styles from './Task.module.css';
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';

interface Props {
  task: ITask;
  listId: string;
}

export const Task: FC<Props> = ({ task }) => {
  const [taskHover, setTaskHover] = useState(true);

  const handleTaskHover = () => {
    setTaskHover(true);
  };
  const handleTaskLeave = () => {
    setTaskHover(false);
  };
  return (
    <li
      onMouseEnter={handleTaskHover}
      onMouseLeave={handleTaskLeave}
      className={styles.liContainer}
    >
      <p className={styles.liContent}>{task.description}</p>
      {taskHover ? (
        <div className={`${styles.iconsContainer}`}>
          <div
            className={`${styles.icons} ${taskHover} && ${styles.taskHover}`}
          >
            <RiPencilLine />
          </div>
          <div
            className={`${styles.icons} ${taskHover} && ${styles.taskHover}`}
          >
            <RiDeleteBinLine />
          </div>
        </div>
      ) : (
        ''
      )}
    </li>
  );
};
