import { FaTree } from "react-icons/fa";
import { GiCactusPot, GiTreeDoor } from "react-icons/gi";
import { LuTreePalm } from "react-icons/lu";
import { PiCactusFill, PiTreeFill } from "react-icons/pi";

const BestService = () => {
  return (
    <div>
      <section className="m-4 md:m-4 rounded-lg dark:bg-gray-100 dark:text-gray-800">
        <div
          className="container mx-auto p-4 my-6 space-y-2 text-center"
          bis_skin_checked="1"
        >
          <h2 className="text-3xl md:text-6xl font-bold">best services</h2>
          <p className="dark:text-gray-600 text-md md:text-2xl italic">
            place where plants are grown for transplanting
          </p>
        </div>
        <div
          className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3"
          bis_skin_checked="1"
        >
          <div className="flex flex-col items-center p-4" bis_skin_checked="1">
            <GiTreeDoor className="text-5xl text-lime-600" />
            <h3 className="my-3 text-3xl font-semibold italic">
              Free Shipping
            </h3>
            <div className="space-y-1 leading-tight" bis_skin_checked="1">
              <p className="text-gray-500 text-center">
                No additional cost for delivery items <br /> shipped directly to
                customers.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4" bis_skin_checked="1">
            <PiTreeFill className="text-5xl text-amber-500" />
            <h3 className="my-3 text-3xl font-semibold">Money Back</h3>
            <div className="space-y-1 leading-tight" bis_skin_checked="1">
              <p className="text-gray-500 text-center">
                Refund offered if customer is unsatisfied <br /> with the
                purchased product.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4" bis_skin_checked="1">
            <GiCactusPot className="text-5xl text-lime-600" />
            <h3 className="my-3 text-3xl font-semibold">Return Policy</h3>
            <div className="space-y-1 leading-tight" bis_skin_checked="1">
              <p className="text-gray-500 text-center">
                Guidelines for returning products within <br /> a specified time
                for refund.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4" bis_skin_checked="1">
            <LuTreePalm className="text-5xl text-amber-500" />
            <h3 className="my-3 text-3xl font-semibold">Contact Us</h3>
            <div className="space-y-1 leading-tight" bis_skin_checked="1">
              <p className="text-gray-500 text-center">
                Reach out for inquiries, support, or <br /> assistance with any
                concerns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestService;
