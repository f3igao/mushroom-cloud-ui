import { FunctionComponent } from 'react';

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <div className="vh-75 flex flex-column justify-center">
      <h1>Mushroom Cloud LA / Proximities</h1>
      <h2>by Nancy Baker Cahill</h2>
    </div>
  );
};

export default HomePage;
