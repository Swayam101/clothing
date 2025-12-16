import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { useUIStore } from '../../store/useUIStore';

const Header: React.FC = () => {
  const { contact } = useConfig();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  const navLinks = [
    { name: 'SHOP', path: '/products' },
    { name: 'SIZE GUIDE', path: '/size-guide' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="z-50 bg-white">
      <div className="border-b border-gray-200 absolute top-20 left-0 w-screen"></div>
      <div className="w-full">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand Name */}
          <Link to="/" className="text-2xl font-light tracking-widest text-black">
            {contact.brandName}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12 gap-24">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg tracking-wide text-gray-800 hover:text-black transition relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 max-w-[1600px] mx-auto">
            <div className="py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm tracking-wide text-gray-800"
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;