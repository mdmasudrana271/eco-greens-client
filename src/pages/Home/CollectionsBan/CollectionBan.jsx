import { NavLink } from "react-router-dom";
import img from "../../../assets/bestsell/collec-removebg-preview.png";

const CollectionBan = () => {
  return (
    <div>
      <section className="p-4 lg:p-8  dark:text-gray-800">
        <div className="container mx-auto space-y-12">
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <img
              src={img}
              alt=""
              className="h-80 dark:bg-gray-50 aspect-video"
            />
            <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
              <h3 className="text-3xl font-bold">
                Eco Green's Plant Collection
              </h3>
              <p className="my-6 dark:text-gray-600">
                Get 50% off On This Month
              </p>
              <NavLink
                to="/products"
                className="self-start btn bg-lime-400 rounded-lg text-white"
              >
                Shop Now
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
            <figure>
              <iframe
                src="https://www.youtube.com/embed/LZhnCxG5c6s?si=KkCLS55Ho7CvCATG"
                title=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-80 dark:bg-gray-500 aspect-video"
              ></iframe>
            </figure>
            <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
              <h3 className="text-3xl font-bold">
                HOUSEPLANT CARE TIPS FOR BEGINNERS
              </h3>
              <p className="my-6 dark:text-gray-600">
                Essential tips for beginners to properly care for houseplants,
                including watering, light, soil, and maintenance for healthy
                growth.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionBan;
