import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/banner/nursery1.jpg";
import img2 from "../../../assets/banner/images 2.jpeg";
import img3 from "../../../assets/banner/nursery3.jpg";
import img4 from "../../../assets/banner/image4.webp";

const Banner = () => {
  return (
    <Carousel>
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="">
              <h1 className="mb-5 text-xl md:text-4xl font-bold text-green-400">
                Wellcome to Eco Greens Countries Largest Online Nusery
              </h1>
              <p className="mb-5 text-md md:text-3xl font-bold">
                Bring Nature Home – Shop Fresh, Lush Plants Today
              </p>
              <button className="btn bg-green-500 text-white border-none">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="">
              <h1 className="mb-5 text-xl md:text-4xl font-bold text-green-400">
                Transform Your Space with Greenery – Explore Our Collection
              </h1>
              <p className="mb-5 text-md md:text-3xl font-bold">
                Nurture Your Love for Plants – Buy, Grow, and Thrive!
              </p>
              <button className="btn bg-green-500 text-white border-none">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${img3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="">
              <h1 className="mb-5 text-xl md:text-4xl font-bold text-green-400">
                From Our Nursery to Your Home – Fresh Plants Delivered
              </h1>
              <p className="mb-5 text-md md:text-3xl font-bold">
                Breathe Easy, Live Green – Shop Beautiful Plants Now
              </p>
              <button className="btn bg-green-500 text-white border-none">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${img4})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="">
              <h1 className="mb-5 text-xl md:text-4xl font-bold text-green-400">
                Nature’s Beauty at Your Doorstep – Start Growing Today
              </h1>
              <p className="mb-5 text-md md:text-3xl font-bold">
                Your One-Stop Plant Shop – Discover, Order, Flourish
              </p>
              <button className="btn bg-green-500 text-white border-none">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <img className="object-cover " src={img6} />
      </div> */}
    </Carousel>
  );
};

export default Banner;
