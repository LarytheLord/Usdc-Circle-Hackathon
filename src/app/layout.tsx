import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI-Powered Predictive DeFi Yield Optimizer',
  description: 'An AI agent that predicts market conditions and automatically optimizes DeFi yields on Arc with voice control',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}