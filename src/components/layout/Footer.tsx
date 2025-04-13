
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-bookworm-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Bookworm</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your one-stop library management system. Discover, borrow, and
              manage books with ease.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-bookworm-500 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-bookworm-500 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-600 hover:text-bookworm-500 text-sm">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-bookworm-500 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-bookworm-500 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-bookworm-500 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-bookworm-500 text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-bookworm-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  123 Library Street, Bookville, BK 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-bookworm-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-bookworm-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600 text-sm">info@bookworm-library.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Bookworm Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
