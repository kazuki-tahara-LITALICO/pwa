import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const APP_NAME = 'NJS App';
const APP_DESCRIPTION = 'Next.js + Serwist PWA';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: '%s - NJS App',
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" dir="ltr">
      <head>
        <style>{`
            html, body, #__next {
              height: 100%;
            }
            #__next {
              margin: 0 auto;
            }
            h1 {
              text-align: center;
            }
            `}</style>
      </head>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
          <h1 className="text-4xl font-bold mb-8 text-blue-600">
            Next.js + Serwist
          </h1>
          {children}
        </div>
      </body>
    </html>
  );
}
