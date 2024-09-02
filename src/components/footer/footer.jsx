
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t border-gray-600 bg-gray-600 text-gray-100 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>Email: sales@sanskritmala.com</p>
          <p>Phone:+918396068147,+917323908890</p>
        </div>

        {/* Useful Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/about" className="hover:text-blue1">About Us</Link>
            </li>
            <li className="mb-2">
              <Link to="/courses" className="hover:text-blue1">Courses</Link>
            </li>
            <li className="mb-2">
              <Link to="/privacy" className="hover:text-blue1">Privacy</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://x.com/ScholarRankAI" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue1">
              <FaXTwitter size={24} />
            </a>
            <a href="https://www.facebook.com/Scholarrank/" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue1">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.instagram.com/scholarrank/" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue1">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/company/scholarrank/about/" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue1">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Statement */}
      <div className="mt-10 text-center   pt-6">
        <p>&copy; 2024 SanskritMala. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
