
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-primary">Class Scribe</h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/student" className="text-sm font-medium hover:text-primary transition-colors">
            Student Portal
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
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
        <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
          <nav className="container py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/student" 
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Student Portal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
