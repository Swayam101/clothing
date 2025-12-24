'use client';

import React from 'react';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import StickyWhatsApp from '@/shared/components/StickyWhatsApp';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="bg-white px-2 lg:px-56">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20 w-full">{children}</main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </div>
  );
};

export default MainLayout;
