import styles from './AddNewList.module.css';
import { IoMdAdd } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { createList } from '../../utils/';

const AddNewList: FC = () => {
  const dispatch = useAppDispatch();
  const { fullData } = useAppSelector((state) => state.userSlice);

  const [addInput, setAddInput] = useState(false);
  const [captureText, setCaptureText] = useState('');

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setCaptureText(value);
  };
  const addList = async () => {
    try {
      await createList(
        captureText,
        fullData?.id!,
        fullData?.user_name!,
        fullData?.password!
      );
      await dispatch(
        getFullDataUser(fullData?.user_name!, fullData?.password!)
      );
      setAddInput(false);
    } catch (error: any) {
      alert('Algo salió mal, intenta guardar la lista mas tarde');
    }
  };
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
            onChange={handleInputChange}
            autoFocus
            className={styles.input}
            type='text'
            placeholder='Introduzca el título de la lista...'
          />
          <div className={styles.buttons}>
            <button onClick={addList} className={styles.buttonAddList}>
              Añadir lista
            </button>
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
