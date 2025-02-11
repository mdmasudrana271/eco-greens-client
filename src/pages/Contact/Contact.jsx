import Lottie from "lottie-react";
import animation from "../../assets/animation/tree.json";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Eco Greens | Contact</title>
      </Helmet>
      <div
        className="grid  grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-contactBg text-gray-800"
        bis_skin_checked="1"
      >
        <div className="flex flex-col justify-between" bis_skin_checked="1">
          <div className="space-y-2" bis_skin_checked="1">
            <h2 className="text-4xl font-bold leading-tight ">
              🌿 Contact Us | Eco Greens
            </h2>
            <div className="text-gray-600 text-center" bis_skin_checked="1">
              Let's Connect with Nature!
            </div>
          </div>
          <figure className="h-full md:w-80">
            <Lottie animationData={animation} loop={true} />
          </figure>
        </div>
        <form
          noValidate=""
          className="space-y-6"
          action="https://getform.io/f/923d35e5-4392-4fdd-8a69-533de3d72d65"
          method="POST"
        >
          <div bis_skin_checked="1">
            <label htmlFor="name" className="text-sm">
              Full name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              placeholder=""
              className="w-full p-3 rounded bg-gray-100"
            />
          </div>
          <div bis_skin_checked="1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full p-3 rounded bg-gray-100 "
            />
          </div>
          <div bis_skin_checked="1">
            <label htmlFor="message" className="text-sm">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="3"
              required
              className="w-full p-3 rounded bg-gray-100"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-green-400 text-white"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
