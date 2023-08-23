import { FC } from 'react';
import styles from './FinalListSection.module.css';
import AddNewTask from './AddNewTask/AddNewTask';
import ClearListButton from './ClearListButton/ClearListButton';
import { IList } from '../../interfaces';

interface Props {
  list: IList;
}

const FinalListSection: FC<Props> = ({ list }) => {
  return (
    <div className={`${styles.finalSection}`}>
      <AddNewTask listId={list.id} />
      <ClearListButton list={list} />
    </div>
  );
};

export default FinalListSection;
