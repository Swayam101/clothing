'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Share2, MessageCircle, Facebook, Twitter, Link2, Copy, Check, X } from 'lucide-react';
import { useModal } from '@/hooks/useModal';

interface ShareButtonProps {
  productUrl: string;
  productName: string;
  productPrice: number;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  productUrl,
  productName,
  productPrice,
  className = '',
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Modal accessibility and scrolling
  const { handleBackdropClick } = useModal({
    isOpen: showShareModal,
    onClose: () => setShowShareModal(false)
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (showShareModal && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [showShareModal]);

  // Share functionality
  const shareText = `Check out this amazing ${productName} from Drift N Thrift! ✨`;
  const shareTitle = `${productName} - Drift N Thrift`;

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${productUrl}`)}`;
        window.open(whatsappUrl, '_blank');
      },
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(facebookUrl, '_blank');
      },
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-sky-500',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`;
        window.open(twitterUrl, '_blank');
      },
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = productUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowShareModal(true)}
        className={`p-2 rounded-full hover:bg-gray-50 transition-colors ${className}`}
        aria-label="Share product"
      >
        <Share2 className="w-5 h-5 text-gray-400 hover:text-gray-600" />
      </button>

      {/* Share Modal */}
      {showShareModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
          >
            <div
              ref={modalRef}
              className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 id="share-modal-title" className="text-lg font-medium text-gray-900">
                    Share this piece
                  </h3>
                  <button
                    ref={initialFocusRef}
                    onClick={() => setShowShareModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close share modal"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

              {/* Product Preview */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  {/* Product image would go here - for now using a placeholder */}
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-500">IMG</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{productName}</h4>
                  <p className="text-gray-600 text-sm">₹{productPrice.toFixed(2)}</p>
                </div>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {shareOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.name}
                      onClick={() => {
                        option.action();
                        setShowShareModal(false);
                      }}
                      className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <IconComponent className={`w-6 h-6 ${option.color}`} />
                      <span className="text-sm font-medium text-gray-700">{option.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Copy Link */}
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-3 p-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Link copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-5 h-5" />
                    <span className="font-medium">Copy link</span>
                  </>
                )}
              </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShareButton;