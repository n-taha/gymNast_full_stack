import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Brand */}
        <div>
          <p className="font-bold text-lg">GymNast</p>
          <p className="text-sm text-base-content/70">
            &copy; {new Date().getFullYear()} - All rights reserved
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4 text-sm text-base-content/80">
          <a href="/about" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="/classes" className="hover:text-primary transition-colors">
            Classes
          </a>
          <a
            href="/membership"
            className="hover:text-primary transition-colors"
          >
            Membership
          </a>
          <a href="/contact" className="hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition-colors"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
