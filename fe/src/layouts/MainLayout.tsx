import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';
import StickyWhatsApp from '../shared/components/StickyWhatsApp';

const MainLayout: React.FC = () => {
  return (
    <div className="bg-white px-2 lg:px-56">
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 w-full">
        <Outlet />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
    </div>
  );
};

export default MainLayout;

