import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Plants from "../Plants/Plants";
import CateBanner from "../CateBanner/CateBanner";
import BestSell from "../BestSell/BestSell";
import BestService from "../BestService/BestService";
import NutrientsBanner from "../NutrientsBanner/NutrientsBanner";
import CollectionBan from "../CollectionsBan/CollectionBan";
import Contact from "../../Contact/Contact";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Eco Greens | Home</title>
      </Helmet>
      <div className="overflow-hidden">
        <Banner></Banner>
      </div>
      <div className="overflow-hidden">
        <Plants></Plants>
      </div>
      <div className="overflow-hidden">
        <BestSell></BestSell>
      </div>
      <div className="overflow-hidden">
        <BestService></BestService>
      </div>
      <div className="overflow-hidden">
        <NutrientsBanner></NutrientsBanner>
      </div>
      <div className="overflow-hidden">
        <CollectionBan></CollectionBan>
      </div>
      <div className="overflow-hidden mx-8 my-5">
        <Contact></Contact>
      </div>
    </div>
  );
};

export default Home;
