import { FaSunPlantWilt } from "react-icons/fa6";
import { PiPlantBold, PiPlantFill } from "react-icons/pi";
import { RiPlantFill } from "react-icons/ri";

const NutrientsBanner = () => {
  return (
    <div className="mx-4 md:h-[600px] bg-cover bg-wellImg bg-customGreen pt-5  rounded-lg my-10">
      <div
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration="1500"
        className="container  p-4 my-6 space-y-2 text-center"
        bis_skin_checked="1"
      >
        <h2 className="text-3xl md:text-5xl text-white font-bold">
          welcome to the eco greens plants store
        </h2>
        <p className="dark:text-white text-md md:text-xl italic">
          Explore the essential nutrients plants need for healthy growth and
          vitality.
        </p>
      </div>
      <div className="text-white  grid md:grid-cols-2 grid-cols-1 md:gap-10 px-6">
        <div
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="flex justify-center  items-center gap-3 my-10"
        >
          <div>
            <h4 className="text-xl font-bold">Green Your Space</h4>
            <p>
              Enhance your environment with <br /> sustainable, eco-friendly
              practices.
            </p>
          </div>
          <RiPlantFill className="" size={90} />
        </div>
        <div
          data-aos="fade-left"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="flex justify-center  items-center gap-3 my-10"
        >
          <div>
            <h4 className="text-xl font-bold">Nature’s Best, Delivered</h4>
            <p>
              Experience the finest natural products, <br /> delivered fresh to
              your door.
            </p>
          </div>
          <FaSunPlantWilt size={90} />
        </div>
        <div
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="flex justify-center  items-center gap-3 my-10"
        >
          <div>
            <h4 className="text-xl font-bold">Grow Your Garden</h4>
            <p>
              Cultivate your own garden and watch <br /> it flourish
              beautifully.
            </p>
          </div>
          <PiPlantBold size={90} />
        </div>
        <div
          data-aos="fade-left"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="flex justify-center  items-center gap-3 my-10"
        >
          <div>
            <h4 className="text-xl font-bold">Bloom with Us</h4>
            <p>
              Join us to grow, thrive, and <br /> bloom in every way.
            </p>
          </div>
          <PiPlantFill size={90} />
        </div>
      </div>
    </div>
  );
};

export default NutrientsBanner;
