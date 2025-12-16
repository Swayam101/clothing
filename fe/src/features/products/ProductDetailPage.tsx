import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts, useProduct, transformStrapiProduct } from '../../api';
import { useProductStore } from '../../store/useProductStore';
import { openWhatsApp, getOrderMessage } from '../../utils/whatsapp';
import { useConfig } from '../../context/ConfigContext';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import SizeSelector from './components/SizeSelector';
import OrderButtons from './components/OrderButtons';
import TrustSignals from './components/TrustSignals';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { contact } = useConfig();
  const { selectedSize, setSelectedSize, resetSelection } = useProductStore();

  // First, fetch all products to find the documentId from slug
  const { data: productsData } = useProducts({
    populate: 'image',
    pagination: { pageSize: 100 }, // Fetch enough products to find the one we need
  });

  // Find the documentId matching the slug
  const documentId = useMemo(() => {
    if (!productsData?.data || !slug) return null;
    
    const matchingProduct = productsData.data.find((strapiProduct) => {
      const productSlug = strapiProduct.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return productSlug === slug;
    });

    return matchingProduct?.documentId || null;
  }, [productsData, slug]);

  // Fetch single product detail by documentId
  const {
    data: productData,
    isLoading,
    error,
  } = useProduct(
    documentId || '',
    { populate: 'image' },
    !!documentId // Only fetch when we have a documentId
  );

  // Transform Strapi product to app Product format
  const product = useMemo(() => {
    if (!productData?.data) return null;
    return transformStrapiProduct(productData.data);
  }, [productData]);

  useEffect(() => {
    // Reset size selection when changing products
    resetSelection();
  }, [slug, resetSelection]);

  // Loading state
  if (isLoading || (!product && !error)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-light mb-4 text-red-600">Error Loading Product</h1>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <Link
            to="/products"
            className="inline-block text-sm tracking-wide underline underline-offset-4 hover:no-underline transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-light mb-4">Product Not Found</h1>
        <Link
          to="/products"
          className="text-sm tracking-wide underline underline-offset-4 hover:no-underline transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    const message = getOrderMessage(product.name, selectedSize);
    openWhatsApp(message);
  };

  const handleInstagramOrder = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    window.open(contact.instagramUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-500 tracking-wide">
            <Link to="/" className="hover:text-black transition">
              HOME
            </Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-black transition">
              SHOP
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black">{product.name.toUpperCase()}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Product Images */}
            <ImageGallery images={product.images} productName={product.name} />

            {/* Product Info & Actions */}
            <div className="space-y-8">
              <ProductInfo
                name={product.name}
                price={product.price}
                description={product.description}
                fabric={product.fabric}
                fit={product.fit}
                care={product.care}
              />

              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSizeSelect={setSelectedSize}
              />

              <OrderButtons
                selectedSize={selectedSize}
                onWhatsAppOrder={handleWhatsAppOrder}
                onInstagramOrder={handleInstagramOrder}
              />

              <TrustSignals />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
