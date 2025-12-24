import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Drift N Thrift',
  description: 'Handpicked vintage finds. Sustainable fashion with soul.',
  icons: {
    icon: '/favicon.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}

