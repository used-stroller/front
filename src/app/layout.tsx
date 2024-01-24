import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './reset.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '중모차',
  description: '똑똑한 엄빠의 중모차',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
