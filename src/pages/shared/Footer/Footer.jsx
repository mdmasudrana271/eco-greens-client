import { Link } from "react-router-dom";
import img from "../../../assets/eco-green.png";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="px-4 divide-y bg-green-200 dark:text-gray-800">
        <div
          className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0"
          bis_skin_checked="1"
        >
          <div className="lg:w-1/3" bis_skin_checked="1">
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex justify-center space-x-3 lg:justify-start"
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full "
                bis_skin_checked="1"
              >
                <img src={img} alt="tree image" />
              </div>
              <span className="self-center text-2xl font-semibold">
                Eco Greens
              </span>
            </a>
          </div>
          <div
            className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4"
            bis_skin_checked="1"
          >
            <div className="space-y-3" bis_skin_checked="1">
              <h3 className="tracking-wide uppercase dark:text-gray-900">
                Product
              </h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Features
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Integrations
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Pricing
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3" bis_skin_checked="1">
              <h3 className="tracking-wide uppercase dark:text-gray-900">
                Company
              </h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Privacy
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3" bis_skin_checked="1">
              <h3 className="uppercase dark:text-gray-900">Developers</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Public API
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Documentation
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Guides
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3" bis_skin_checked="1">
              <div
                className="uppercase dark:text-gray-900"
                bis_skin_checked="1"
              >
                Social media
              </div>
              <div
                className="flex justify-start space-x-3"
                bis_skin_checked="1"
              >
                <Link
                  to="https://www.facebook.com/mdabdullamasud.rana"
                  rel="noopener noreferrer"
                  title="Facebook"
                  target="blank"
                  className="flex items-center p-1"
                >
                  <FaFacebook className="text-2xl"></FaFacebook>
                </Link>
                <Link
                  to="https://www.linkedin.com/in/md-abdullahalmasud/"
                  target="blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="flex items-center p-1"
                >
                  <FaLinkedin className="text-2xl"></FaLinkedin>
                </Link>
                <Link
                  to="https://github.com/mdmasudrana271"
                  rel="noopener noreferrer"
                  title="Github"
                  target="blank"
                  className="flex items-center p-1"
                >
                  <FaGithub className="text-2xl"></FaGithub>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="py-6 text-sm text-center dark:text-gray-600"
          bis_skin_checked="1"
        >
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Eco
            Greens
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
