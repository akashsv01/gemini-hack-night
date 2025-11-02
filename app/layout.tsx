import './globals.css'; // This imports Tailwind CSS styles
import type { Metadata } from 'next'; 
import { Inter } from 'next/font/google'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blank Title Page',
  description: 'A minimal page with just a title.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 'children' will be the content from app/page.tsx */}
        {children}
      </body>
    </html>
  );
}