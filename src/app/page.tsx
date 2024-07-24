// src/app/page.tsx
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const sections: string[] = ['Billing', 'Payments'];

  return (
    <div className="p-4">
      <h1>Welcome to the Documentation</h1>
      <p>Select a section from the menu to view the content.</p>
      
      <nav className="space-y-4">
        {sections.map((section, index) => (
          <div key={index}>
            <Link href={`Pages/${section}`} className="text-blue-600 hover:underline">
              {section}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
