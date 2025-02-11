import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../../../assets/animation/paymentsucc.json";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center border border-green-300">
        <div className="flex justify-center">
          <figure className="h-full md:w-80">
            <Lottie animationData={animation} loop={true} />
          </figure>
        </div>

        <h1 className="text-3xl font-bold text-green-700 mt-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your payment! <br /> Your transaction was completed
          smoothly. <br />
          <span className="text-green-600 font-semibold"> Eco Greens</span>{" "}
          <br />
          appreciates your support in making the world a greener place! 🌱
        </p>

        {/* Button to Homepage */}
        <Link
          to="/"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
