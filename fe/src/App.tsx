import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from './context/ConfigContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './features/home/HomePage';
import ProductsPage from './features/products/ProductsPage';
import ProductDetailPage from './features/products/ProductDetailPage';
import SizeGuidePage from './features/size-guide/SizeGuidePage';
import AboutPage from './features/about/AboutPage';
import ContactPage from './features/contact/ContactPage';

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:slug" element={<ProductDetailPage />} />
            <Route path="size-guide" element={<SizeGuidePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
