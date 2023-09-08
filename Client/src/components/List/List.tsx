import { FC, FormEvent, useState, ChangeEvent } from 'react';
import { IList } from '../../interfaces';
import { Task } from '../Task/Task';
import styles from './List.module.css';
import { BsPencil } from 'react-icons/bs';
import FinalListSection from '../FinalListSection/FinalListSection';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { updateList } from '../../utils';
import { ThreeDots } from 'react-loader-spinner';

import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

interface Props {
  list: IList;
}
const List: FC<Props> = ({ list }) => {
  const dispatch = useAppDispatch();
  const { fullData } = useAppSelector((state) => state.userSlice);

  const [addInputEdit, setAddInputEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [initialTextAreaValue, setInitialTextAreaValue] = useState(list.name);
  const [spinnerListTitle, setSpinnerListTitle] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value.trim());
    setInitialTextAreaValue(value);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setAddInputEdit(false); //Pongo en false para que se quite el input
    setInputValue(inputValue.trim());
    setInitialTextAreaValue(initialTextAreaValue.trim());
    if (inputValue.length > 20) {
      return alert('¡Texto muy largo!,maximo 20 caracteres');
    }
    if (inputValue.trim().length >= 1) {
      //compruevo que al menos tenga un caracter y que no sean espacios para no hacer la petición al pedo
      setSpinnerListTitle(true); //agrego el spinner para avisar que esta cargando al user
      const update = await updateList(
        list.id,
        fullData?.user_name!,
        fullData?.password!,
        inputValue.trim()
      );
      !update
        ? alert('Error al editar la lista, intenta mas tarde.')
        : await dispatch(
            getFullDataUser(fullData?.user_name!, fullData?.password!)
          );
      setSpinnerListTitle(false); //quito el spiner cuando termine de hacer la petición
      setInputValue(''); //Limpio el estado para evitar problemas
    }
  };

  //...........................................................................

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    const oldIndex = list.Tasks.findIndex((task) => task.id === active.id);
    const newIndex = list.Tasks.findIndex((task) => task.id === over!.id);
  };
  //...........................................................................
  return (
    <div className={styles.list}>
      <div className={styles.headerContainer}>
        {!addInputEdit && !spinnerListTitle ? (
          <h3 onClick={() => setAddInputEdit(true)} className={styles.title}>
            {list.name}
          </h3>
        ) : spinnerListTitle ? (
          <div className={styles.spinnerContainer}>
            <p>Cambiando nombre...</p>
            <ThreeDots
              height='20'
              width='30'
              radius='9'
              color='#4fa94d'
              ariaLabel='three-dots-loading'
              wrapperStyle={{}}
              visible={true}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleInputChange}
              className={styles.input}
              type='text'
              autoFocus
              onBlur={handleSubmit}
              maxLength={20}
              value={initialTextAreaValue}
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
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <ul className={styles.ul}>
          <SortableContext
            items={list.Tasks}
            strategy={verticalListSortingStrategy}
          >
            {list.Tasks?.map((task) => (
              <Task key={task.id} listId={list.id} task={task} />
            ))}
          </SortableContext>
        </ul>
      </DndContext>
      <FinalListSection list={list} />
    </div>
  );
};

export default List;
