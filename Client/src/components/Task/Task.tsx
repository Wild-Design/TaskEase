import { FC, useState } from 'react';
import { ITask } from '../../interfaces';
import styles from './Task.module.css';
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { deleteTask } from '../../utils';
import { ThreeDots } from 'react-loader-spinner';

interface Props {
  task: ITask;
  listId: string;
}

export const Task: FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();

  const { fullData } = useAppSelector((state) => state.userSlice);

  const [taskHover, setTaskHover] = useState(false);

  const [changeDeleteButton, setChangeDeleteButton] = useState(false);

  const handleDelete = async () => {
    try {
      setChangeDeleteButton(true);
      await deleteTask(task.id, fullData?.user_name!, fullData?.password!);
      await dispatch(
        getFullDataUser(fullData?.user_name!, fullData?.password!)
      );
    } catch (error: any) {
      setChangeDeleteButton(false);
      alert('Error al borrar, intenta mas tarde queseyo');
    }
  };
  return (
    <li
      onMouseEnter={() => setTaskHover(true)}
      onMouseLeave={() => setTaskHover(false)}
      className={styles.liContainer}
    >
      <p className={styles.liContent}>{task.description}</p>
      {taskHover && (
        <div
          className={`${styles.iconsContainer}  ${
            changeDeleteButton && styles.iconsOff
          }`}
        >
          <div className={styles.iconsDiv}>
            <RiPencilLine />
          </div>
          <div onClick={handleDelete} className={styles.iconsDiv}>
            <RiDeleteBinLine />
          </div>
        </div>
      )}
      {changeDeleteButton && (
        <div className={styles.spinnerContainer}>
          <ThreeDots
            height='30'
            width='30'
            radius='9'
            color='#4fa94d'
            ariaLabel='three-dots-loading'
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      )}
    </li>
  );
};
