import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PeptiLab — Science. Quality. Results.',
  description: 'Péptidos farmacéuticos de grado premium para investigación científica. Alta pureza certificada y asesoría especializada.',
  keywords: 'peptilab, péptidos, peptides, farmacéutico, investigación, BPC-157, TB-500, Venezuela',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PeptiLab',
  },
  openGraph: {
    title: 'PeptiLab — Science. Quality. Results.',
    description: 'Péptidos de alta pureza para investigación científica de élite.',
    type: 'website',
    locale: 'es_VE',
  },
};

export const viewport: Viewport = {
  themeColor: '#B8A06A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-black-main text-white overflow-x-hidden antialiased">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});})}`,
          }}
        />
      </body>
    </html>
  );
}
