'use client'

import React, { ReactNode } from 'react';
import Link from 'next/link';
import ModalMenu from './ModalMenu';
import { usePathname } from 'next/navigation';
import DummyData from '../DummyData.json';
import SearchBar from './SearchBar';
import '../globals.css'; 

interface LayoutProps {
  children: ReactNode;
  docsData?: any; // Adjust this according to the shape of your data
}

const Layout: React.FC<LayoutProps> = ({ children, docsData }) => {
  const pathname = usePathname();

  // Extract the current section from the pathname
  const currentSection = pathname.split('/')[1];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between">
      <p className="text-[28px] font-sora font-normal m-0 text-white text-xl mr-2">ChargeBee</p>
        <p className="text-[28px] font-sora font-normal m-0 text-spunky-lime"> Docs</p>
        <SearchBar/>
        
        <Link href = {''} className="mr-6 no-underline text-xl text-white text-base font-normal" >
        Support
      </Link>
        {/* <div className='flex'>
          <ModalMenu />
          <div>Icon</div>
        </div> */}
      </header>

      <div className="sticky top-0 bg-verBlue text-white p-4">
      <ul className="flex font-sora space-x-8">
      {DummyData.map((section, index) => (
        <li key={index}>
          <Link
            href={`/Pages/${section.section}`}
            className={`${
              pathname.includes(section.section)
                ? 'underline-custom'
                : ''
            }`}
          >
            {section.section}
          </Link>
        </li>
      ))}
    </ul>

      </div>

      <main className="flex-grow p-4 mr-5 ml-5">
        {React.cloneElement(children as React.ReactElement, { currentSection })}
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <p>Footer Content</p>
      </footer>
    </div>
  );
};

export default Layout;
