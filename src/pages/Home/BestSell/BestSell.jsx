import React from "react";
import img1 from "../../../assets/bestsell/caktus1-removebg-preview.png";
import img2 from "../../../assets/bestsell/caktus2-removebg-preview.png";

const BestSell = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 mx-5 my-5">
      <div
        data-aos="fade-right"
        className="card lg:card-side bg-stone-100 shadow-xl"
      >
        <img
          className="cover h-80 w-full md:w-1/2 transition-transform duration-300 hover:scale-110"
          src={img1}
          alt="Album"
        />
        <div className="card-body">
          <h2 className="card-title text-4xl text-black font-bold italic">
            new plant!
          </h2>
          <p className="text-xl">get 30% off</p>
          <div className="card-actions justify-end">
            <button className="btn rounded-lg bg-lime-400 text-white">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="card lg:card-side bg-stone-100 shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title text-4xl text-black font-bold italic ">
            best selling
          </h2>
          <p className="text-xl">collection of cactus</p>
          <div className="card-actions md:justify-start justify-end">
            <button className="btn rounded-lg bg-lime-400 text-white">
              Shop Now
            </button>
          </div>
        </div>
        <img
          className="cover h-80 w-full md:w-1/2 transition-transform duration-300 hover:scale-110"
          src={img2}
          alt="Album"
        />
        {/* <figure></figure> */}
      </div>
    </div>
  );
};

export default BestSell;
