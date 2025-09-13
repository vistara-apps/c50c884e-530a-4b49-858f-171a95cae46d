import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'CryptoStart Buddy',
  description: 'Your friendly guide to crypto, jargon-free and scam-free.',
  openGraph: {
    title: 'CryptoStart Buddy',
    description: 'Your friendly guide to crypto, jargon-free and scam-free.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoStart Buddy',
    description: 'Your friendly guide to crypto, jargon-free and scam-free.',
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
