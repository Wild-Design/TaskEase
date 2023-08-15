import styles from './AddNewList.module.css';

const AddNewList = () => {
  return (
    <div className={styles.addContainer}>
      <span>+</span>
      <span>Añada otra lista</span>{' '}
    </div>
  );
};

export default AddNewList;
