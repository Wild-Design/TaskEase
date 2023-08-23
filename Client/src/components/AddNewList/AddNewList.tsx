import styles from './AddNewList.module.css';
import { IoMdAdd } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import { useState } from 'react';

const AddNewList = () => {
  const [addInput, setAddInput] = useState(false);

  return (
    <>
      <div
        onClick={() => setAddInput(true)}
        className={`${styles.addContainer} ${addInput && styles.addListHidden}`}
      >
        <span className={styles.addIcon}>{<IoMdAdd />}</span>
        <span className={styles.text}>Añada otra lista</span>
      </div>
      {addInput && (
        <div className={styles.formContainer}>
          <input
            className={styles.input}
            type='text'
            placeholder='Introduzca el título de la lista...'
          />
          <div className={styles.buttons}>
            <button className={styles.buttonAddList}>Añadir lista</button>
            <div
              onClick={() => setAddInput(false)}
              className={styles.buttonCancel}
            >
              <RxCross1 />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewList;
