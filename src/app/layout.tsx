// src/app/layout.tsx
import React from 'react';
import Layout from './Components/Layout'; // Adjust the path if needed
import Head from 'next/head';
import './globals.css'; 


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
