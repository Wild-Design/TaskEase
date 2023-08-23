import styles from './AddNewList.module.css';
import { IoMdAdd } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { createList } from '../../utils/';
import { ThreeDots } from 'react-loader-spinner';
const AddNewList: FC = () => {
  const dispatch = useAppDispatch();
  const { fullData } = useAppSelector((state) => state.userSlice);

  const [addInput, setAddInput] = useState(false); //Lo uso para ocultar el botton inicial y para mostrar el input y demas botones
  const [inputValue, setInputValue] = useState(''); //Aquí solo tomo el valor del input
  const [charging, setCharging] = useState(false); //Aquí solo agrego el spinner de carga y quito los botones de agregar y borrar para que no hallan posibles problemas

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };
  const addList = async (): Promise<void> => {
    try {
      if (inputValue.trim().length > 0 && inputValue.length > 0) {
        //compruevo que el input tenga al menos un caracter
        setCharging(true);
        await createList(
          inputValue,
          fullData?.id!,
          fullData?.user_name!,
          fullData?.password!
        );
        await dispatch(
          getFullDataUser(fullData?.user_name!, fullData?.password!)
        );
        setAddInput(false);
        setCharging(false);
        setInputValue('');
      }
    } catch (error: any) {
      setCharging(false);
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
          {!charging ? (
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
          ) : (
            <div className={styles.spinner}>
              <ThreeDots
                height='30'
                width='40'
                radius='9'
                color='#4fa94d'
                ariaLabel='three-dots-loading'
                wrapperStyle={{}}
                visible={true}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddNewList;
