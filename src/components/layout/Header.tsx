
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, X, Calculator } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b bg-primary sticky top-0 z-50 animate-fade-in-up">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 animate-slide-in-left">
          <Calendar className="h-6 w-6 text-white" />
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-white hover:text-gray-200 transition-colors">Class Scribe</h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 animate-slide-in-right">
          <Link to="/" className="nav-link text-sm font-medium text-white hover:text-gray-200 transition-colors">
            Home
          </Link>
          <Link to="/student" className="nav-link text-sm font-medium text-white hover:text-gray-200 transition-colors">
            Student Portal
          </Link>
          <Link to="/gpa-calculator" className="nav-link text-sm font-medium text-white hover:text-gray-200 transition-colors flex items-center gap-1">
            <Calculator className="h-4 w-4" />
            GPA Calculator
          </Link>
          <Link to="/cgpa-calculator" className="nav-link text-sm font-medium text-white hover:text-gray-200 transition-colors flex items-center gap-1">
            <Calculator className="h-4 w-4" />
            CGPA Calculator
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="text-white hover:bg-white/10"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-primary mobile-menu-enter">
          <nav className="container py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-sm font-medium text-white hover:text-gray-200 transition-colors py-2 hover-lift"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/student" 
              className="block text-sm font-medium text-white hover:text-gray-200 transition-colors py-2 hover-lift"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Student Portal
            </Link>
            <Link 
              to="/gpa-calculator" 
              className="block text-sm font-medium text-white hover:text-gray-200 transition-colors py-2 hover-lift flex items-center gap-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Calculator className="h-4 w-4" />
              GPA Calculator
            </Link>
            <Link 
              to="/cgpa-calculator" 
              className="block text-sm font-medium text-white hover:text-gray-200 transition-colors py-2 hover-lift flex items-center gap-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Calculator className="h-4 w-4" />
              CGPA Calculator
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
