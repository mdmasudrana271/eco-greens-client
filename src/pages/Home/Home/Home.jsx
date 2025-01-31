import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Plants from "../Plants/Plants";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Eco Greens | Home</title>
      </Helmet>
      <Banner></Banner>
      <Plants></Plants>
    </div>
  );
};

export default Home;
