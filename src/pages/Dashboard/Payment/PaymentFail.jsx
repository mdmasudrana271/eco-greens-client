import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../../../assets/animation/paymentfail.json";
import { Helmet } from "react-helmet-async";

const PaymentFail = () => {
  return (
    <>
      <Helmet>
        <title>Eco Greens | Payment Failed</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center border border-red-300">
          {/* Error Icon */}
          <div className="flex justify-center">
            <figure className="h-full md:w-80">
              <Lottie animationData={animation} loop={true} />
            </figure>
          </div>

          <h1 className="text-3xl font-bold text-red-700 mt-4">
            Payment Failed
          </h1>
          <p className="text-gray-600 mt-2">
            Oops! Something went wrong with your transaction. Unfortunately, we
            couldn't process your payment. Please check your details and try
            again. 🌱
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col space-y-3">
            <Link
              to="/dashboard/orders"
              className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
            >
              Try Again
            </Link>

            <Link
              to="/contact"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFail;
