import { FC } from 'react';
import { IList } from '../../interfaces';

interface Props {
  list: IList;
}
const List: FC<Props> = ({ list }) => {
  return (
    <>
      <h3>{list.name}</h3>
    </>
  );
};

export default List;
