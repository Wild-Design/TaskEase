import { FC } from 'react';
import styles from './AddNewTask.module.css';
import { IoMdAdd } from 'react-icons/io';

interface Props {
  listId: string;
}

const AddNewTask: FC<Props> = () => {
  return (
    <div className={styles.addTaskContainer}>
      <IoMdAdd />
      <span>Añadir nueva tarea</span>
    </div>
  );
};

export default AddNewTask;
