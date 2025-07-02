import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-12">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-6">
          <a href="#" className="text-3xl font-bold text-blue-400">
            Endless Realty
          </a>
          <p className="text-gray-400 mt-2">Your trusted real estate partner for Tier 2 cities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/properties" className="text-gray-400 hover:text-blue-400">
                  Properties
                </a>
              </li>
              <li>
                <a href="/about-us" className="text-gray-400 hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Contact Us</h4>
            <p className="text-gray-400">Caps Town, Indore, MP 452010</p>
            <p className="text-gray-400">Email: endlessrealtyindore@gmail.com</p>
            <p className="text-gray-400">Phone: +91 731 498 5600</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/endlessrealty_indore?igsh=MWVtdmFycWdnOHM4Mg=="
                className="text-gray-400 hover:text-blue-400 text-2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm">&copy; 2025 Endless Realty. All rights reserved.</p>
      </div>

      <div className="mt-0 w-full text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-bold text-gray-900 mb-1">Indore Head Office</h4>
            <p className="text-gray-600">Caps Town, Indore, MP 452010</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;