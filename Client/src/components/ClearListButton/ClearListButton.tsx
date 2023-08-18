import { FC, useState } from 'react';
import styles from './ClearListButton.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IList } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFullDataUser } from '../../features/userSlice';
import { deleteList } from '../../utils';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner';

interface Props {
  list: IList;
}

const ButtonDelete: FC<Props> = ({ list }) => {
  const dispatch = useAppDispatch();
  const { fullData } = useAppSelector((state) => state.userSlice);

  const [expecting, setExpecting] = useState(false);
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: `¿Seguro que quieres borrar la Lista "${list.name}"?`,
        text: 'Se borrará la lista junto con todas las tareas',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, quiero borrar la lista',
      });
      if (result.isConfirmed) {
        setExpecting(true);
        await deleteList(list.id, fullData!.user_name, fullData!.password);
        await dispatch(
          getFullDataUser(fullData!.user_name, fullData!.password)
        );
        Swal.fire(
          'Borrada',
          'La lista fue borrada de forma exitosa',
          'success'
        );
      }
    } catch (error) {
      setExpecting(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error, intenta borrar la lista más tarde',
      });
    }
  };
  return (
    <>
      <div onClick={handleDelete} className={styles.deleteContainer}>
        {!expecting ? (
          <RiDeleteBinLine />
        ) : (
          <ThreeDots
            height='20'
            width='40'
            radius='9'
            color='#4fa94d'
            ariaLabel='three-dots-loading'
            wrapperStyle={{}}
            visible={true}
          />
        )}
      </div>
    </>
  );
};

export default ButtonDelete;
