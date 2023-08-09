import { useAppSelector } from '../../app/hooks';

const Home = () => {
  const { fullData } = useAppSelector((state) => state.userSlice);
  return (
    <>
      <div>
        <h2>Home</h2>
        <h4>{JSON.stringify(fullData)}</h4>
      </div>
    </>
  );
};

export default Home;
