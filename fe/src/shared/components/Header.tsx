'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { NAVIGATION } from '@/data/content/site';

const Header: React.FC = () => {
  const { contact } = useConfig();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const { isAuthenticated, user } = useAuthStore();
  const { signOut } = useFirebaseAuth();
  const router = useRouter();

  const navLinks = NAVIGATION.mainNav.filter(link =>
    !link.authRequired || isAuthenticated
  );

  const handleLogout = async () => {
    const result = await signOut();
    closeMobileMenu();
    if (result.success) {
      router.push('/');
    } else {
      // Error is already handled in useFirebaseAuth hook
      console.error('Logout failed:', result.error);
    }
  };

  return (
    <header className="z-50 bg-white">
      <div className="border-b border-gray-200 absolute top-20 left-0 w-screen"></div>
      <div className="w-full">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand Name */}
          <Link href="/" className="text-2xl font-light tracking-widest text-black">
            {contact.brandName}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Nav Links */}
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-sm tracking-wide text-gray-800 hover:text-black transition relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-3 ml-4 pl-8 border-l border-gray-200">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-2 text-gray-800 px-3">
                    <User size={16} strokeWidth={1.5} />
                    <span className="text-xs tracking-wide max-w-[120px] truncate">
                      {user.name || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-xs tracking-wide border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                    aria-label="Logout"
                  >
                    <LogOut size={14} strokeWidth={1.5} />
                    <span>{NAVIGATION.auth.signOut}</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs tracking-wide bg-black text-white hover:bg-gray-800 transition-all duration-300"
                >
                  {NAVIGATION.auth.signIn}
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-6 space-y-3">
              {/* Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="block text-sm tracking-wide text-gray-800 hover:text-black transition"
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-2 text-gray-800 mb-3">
                      <User size={16} strokeWidth={1.5} />
                      <span className="text-sm tracking-wide truncate">
                        {user.name || user.email}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs tracking-wide border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <LogOut size={14} strokeWidth={1.5} />
                      <span>{NAVIGATION.auth.signOut}</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full text-center px-4 py-3 text-xs tracking-wide bg-black text-white hover:bg-gray-800 transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    {NAVIGATION.auth.signIn}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
