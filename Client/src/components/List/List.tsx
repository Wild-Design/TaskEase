import { ChangeEvent, FC, useState } from 'react';
import { IList } from '../../interfaces';
import { Task } from '../Task/Task';
import styles from './List.module.css';
import { BsPencil } from 'react-icons/bs';

import FinalListSection from '../FinalListSection/FinalListSection';

interface Props {
  list: IList;
}
const List: FC<Props> = ({ list }) => {
  const [addInputEdit, setAddInputEdit] = useState(false);
  const [inputValue, setInputValue] = useState(list.name);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(inputValue + value);
  };

  return (
    <div className={styles.list}>
      <div className={styles.headerContainer}>
        {!addInputEdit ? (
          <h3 className={styles.title}>{list.name}</h3>
        ) : (
          <form>
            <input
              onChange={handleInputChange}
              className={styles.input}
              type='text'
              autoFocus
              value={inputValue}
            />
          </form>
        )}

        <div
          onClick={() => setAddInputEdit(true)}
          className={styles.pencilContainer}
        >
          <BsPencil />
        </div>
      </div>
      <ul className={styles.ul}>
        {list.Tasks?.map((task) => (
          <Task key={task.id} listId={list.id} task={task} />
        ))}
      </ul>
      <FinalListSection list={list} />
    </div>
  );
};

export default List;
