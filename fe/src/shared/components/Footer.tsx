'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { NAVIGATION, FOOTER_CONTENT } from '@/data/content/site';

const Footer: React.FC = () => {
  const { contact } = useConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Brand Name */}
          <div className="text-2xl font-light tracking-widest">
            {contact.brandName}
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:border-black transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:border-black transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:border-black transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAVIGATION.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 hover:text-black transition-colors tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            {FOOTER_CONTENT.copyright.replace('{year}', String(currentYear))}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
