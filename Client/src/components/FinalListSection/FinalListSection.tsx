import { FC, useState } from 'react';
import styles from './FinalListSection.module.css';
import ClearListButton from './ClearListButton/ClearListButton';
import { IList } from '../../interfaces';
import { IoMdAdd } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import { createTask } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { ThreeDots } from 'react-loader-spinner';

interface Props {
  list: IList;
}

const FinalListSection: FC<Props> = ({ list }) => {
  const dispatch = useAppDispatch();
  const { fullData } = useAppSelector((state) => state.userSlice);

  const [display, setDisplay] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [spinner, setSpinner] = useState(false);

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSaveTask = async () => {
    if (inputValue.trim().length >= 1) {
      setDisplay(false);
      setSpinner(true);
      await createTask(
        list.id,
        fullData?.user_name!,
        fullData?.password!,
        inputValue
      );
      await dispatch(
        getFullDataUser(fullData?.user_name!, fullData?.password!)
      );

      setInputValue('');
      setSpinner(false);
    }
  };
  const handleKeyDown = (event: any) => {
    const { key } = event;
    if (key === 'Enter') handleSaveTask();
  };
  return (
    <>
      {!display ? (
        <div className={`${styles.finalSection}`}>
          {!spinner ? (
            <>
              <div
                onClick={() => setDisplay(true)}
                className={styles.addTaskContainer}
              >
                <IoMdAdd />
                <span>Añadir nueva targeta</span>
              </div>
              <ClearListButton list={list} />
            </>
          ) : (
            <div className={styles.spinner}>
              <span>Agregando targeta...</span>
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
        </div>
      ) : (
        <div className={styles.cosoContainer}>
          <textarea
            autoFocus
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={styles.textArea}
            placeholder='Escribe una descripción...'
          />
          <div className={styles.buttons}>
            <button onClick={handleSaveTask} className={styles.buttonAddCard}>
              Añadir Targeta
            </button>
            <div
              onClick={() => setDisplay(false)}
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

export default FinalListSection;
