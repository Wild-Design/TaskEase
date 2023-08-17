import { FC } from 'react';
import styles from './ClearListButton.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IList } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { deleteList } from '../../utils';

interface Props {
  list: IList;
}

const ButtonDelete: FC<Props> = ({ list }) => {
  const dispatch = useAppDispatch();
  const { fullData } = useAppSelector((state) => state.userSlice);

  const handleDelete = async () => {
    try {
      await deleteList(list.id, fullData!.user_name, fullData!.password);
      dispatch(getFullDataUser(fullData!.user_name, fullData!.password));
      /*En esta funcion llamo a delete list que es la funcion que borra una lista y le paso los
      argumentos necesarios y luego hago dispatch de getFullDataUser para actualizar el estado con la nueva data*/
    } catch (error: any) {
      alert('Ocurrio un error, intenta borrar la lista mas tarde');
    }
  };
  return (
    <div onClick={handleDelete} className={styles.deleteContainer}>
      <RiDeleteBinLine />
    </div>
  );
};

export default ButtonDelete;
