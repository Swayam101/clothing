'use client';

import React from 'react';
import Section from '@/shared/components/ui/Section';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { useNewsletterStore } from '@/store/useNewsletterStore';
import { HOME_NEWSLETTER } from '@/data/content/pages/home';

const NewsletterSection: React.FC = () => {
  const { email, isSubscribed, isLoading, error, setEmail, subscribe } =
    useNewsletterStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe();
  };

  return (
    <Section background="gray" className="py-24">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-5xl font-light leading-tight">
          {HOME_NEWSLETTER.titleLine1}
          <br />
          {HOME_NEWSLETTER.titleLine2}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {HOME_NEWSLETTER.subtitle}
        </p>

        {isSubscribed ? (
          <div className="bg-black text-white py-4 px-6 max-w-lg mx-auto">
            <p className="text-sm tracking-wide">
              {HOME_NEWSLETTER.successMessage}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
          >
            <Input
              type="email"
              placeholder={HOME_NEWSLETTER.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="whitespace-nowrap"
            >
              {isLoading ? HOME_NEWSLETTER.loadingText : HOME_NEWSLETTER.buttonText}
            </Button>
          </form>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </Section>
  );
};

export default NewsletterSection;
