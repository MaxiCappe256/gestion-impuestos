import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/QueryProvider';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Toaster position="top-right" richColors closeButton />
          <main className="container mx-auto p-4">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
