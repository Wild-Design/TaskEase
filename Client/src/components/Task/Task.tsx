import { ChangeEvent, FC, useState } from 'react';
import { ITask } from '../../interfaces';
import styles from './Task.module.css';
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { deleteTask, updateTask } from '../../utils';
import { ThreeDots } from 'react-loader-spinner';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  task: ITask;
  listId: string;
}

export const Task: FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();

  const { fullData } = useAppSelector((state) => state.userSlice);

  const [taskHover, setTaskHover] = useState(false);

  const [changeDeleteButton, setChangeDeleteButton] = useState(false);

  const handleDelete = async (event: any): Promise<void> => {
    event.stopPropagation();
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

  const [displayInput, setDisplayInput] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [textAreaValue, setTextArea] = useState(task.description);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    setNewValue(value);
    setTextArea(value);
  };
  const handleUpdateTask = async (): Promise<void> => {
    setDisplayInput(false);
    setTaskHover(false);
    if (newValue.trim().length >= 1) {
      setSpinner(true);
      await updateTask(
        task.id,
        fullData?.user_name!,
        fullData?.password!,
        newValue.trim()
      );
      setNewValue('');
      await dispatch(
        getFullDataUser(fullData?.user_name!, fullData?.password!)
      );
      setSpinner(false);
    }
  };

  const handleKeyDown = (event: any) => {
    const { key } = event;
    if (key === 'Enter') handleUpdateTask();
  };
  //......................................................................
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  //......................................................................

  return (
    <>
      {!displayInput && !spinner ? (
        <li
          style={style}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
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
              <div
                onClick={() => setDisplayInput(true)}
                className={styles.iconsDiv}
              >
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
      ) : spinner ? (
        <div className={styles.spinnerUpdateContainer}>
          <p>Actualizando...</p>
          <ThreeDots
            height='20'
            width='30'
            radius='9'
            color='#4fa94d'
            ariaLabel='three-dots-loading'
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <div className={styles.textAreaContainer}>
          <textarea
            onChange={handleInputChange}
            onBlur={handleUpdateTask}
            onKeyDown={handleKeyDown}
            className={styles.textArea}
            autoFocus
            value={textAreaValue}
          />
        </div>
      )}
    </>
  );
};
