import { Link } from "react-router-dom";
import img from "../../../assets/eco-green.png";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-4 bg-green-200 text-gray-800">
      {/* Footer Content */}
      <div className="container mx-auto flex flex-col items-center md:items-start md:flex-row justify-between py-10 space-y-8 md:space-y-0">
        {/* Logo & Branding */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start space-x-3"
          >
            <img src={img} alt="Eco Greens Logo" className="w-12 h-12" />
            <span className="text-2xl font-semibold">Eco Greens</span>
          </Link>
        </div>

        {/* Footer Navigation Links */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center md:text-left gap-8">
          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase font-semibold text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:underline">
                  All Plants
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase font-semibold text-gray-900">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h3 className="uppercase font-semibold text-gray-900">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link
                to="https://www.facebook.com/mdabdullamasud.rana"
                target="_blank"
                title="Facebook"
              >
                <FaFacebook className="text-2xl hover:text-blue-700 transition duration-300" />
              </Link>
              <Link
                to="https://www.linkedin.com/in/md-abdullahalmasud/"
                target="_blank"
                title="LinkedIn"
              >
                <FaLinkedin className="text-2xl hover:text-blue-500 transition duration-300" />
              </Link>
              <Link
                to="https://github.com/mdmasudrana271"
                target="_blank"
                title="Github"
              >
                <FaGithub className="text-2xl hover:text-gray-700 transition duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="py-4 text-sm text-center text-gray-600 border-t">
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by Eco
          Greens
        </p>
      </div>
    </footer>
  );
};

export default Footer;
