import { FC } from 'react';
import styles from './ClearListButton.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';

const ButtonDelete: FC = () => {
  return (
    <div className={styles.deleteContainer}>
      <RiDeleteBinLine />
    </div>
  );
};

export default ButtonDelete;
