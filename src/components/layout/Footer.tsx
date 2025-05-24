
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-primary py-8 animate-fade-in-up">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="animate-slide-in-left">
            <h3 className="font-bold text-lg mb-4 text-white">Class Scribe</h3>
            <p className="text-sm text-gray-200">
              PDF document processing and class schedule generation for educational institutions.
            </p>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-medium mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white transition-colors hover-lift">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-200 hover:text-white transition-colors hover-lift">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/student" className="text-gray-200 hover:text-white transition-colors hover-lift">
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-medium mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors hover-lift">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors hover-lift">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors hover-lift">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="animate-slide-in-right">
            <h4 className="font-medium mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-200">contact@classscribe.edu</li>
              <li className="text-gray-200">+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-white/20">
          <p className="text-sm text-gray-200 text-center animate-pulse-slow">
            &copy; {new Date().getFullYear()} Class Scribe Schedule Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
