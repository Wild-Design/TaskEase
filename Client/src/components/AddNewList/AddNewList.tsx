import styles from './AddNewList.module.css';
import { IoMdAdd } from 'react-icons/io';

const AddNewList = () => {
  return (
    <div className={styles.addContainer}>
      <span className={styles.addIcon}>{<IoMdAdd />}</span>
      <span className={styles.text}>Añada otra lista</span>
    </div>
  );
};

export default AddNewList;
