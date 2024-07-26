'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DummyData from '../DummyData.json'
import SearchBar from './SearchBar'
import { FaRegComments } from 'react-icons/fa'
import '../globals.css'

interface LayoutProps {
  children: React.ReactNode
  docsData?: any
}

const Header = () => (
  <header className="bg-gray-800 text-white p-4 flex justify-between items-center z-10">
    <div className="flex">
      <p className="text-[28px] font-sora font-normal m-0 text-white text-xl mr-2">
        ChargeBee
      </p>
      <p className="hidden md:flex text-[28px] font-sora font-normal m-0 text-spunky-lime">
        Docs
      </p>
    </div>
    <button className="p-2 bg-gray-800 text-white rounded-full md:hidden">
      <FaRegComments className="w-6 h-6" />
    </button>
    <div className="hidden md:flex items-center space-x-6">
      <SearchBar />
      <Link
        href=""
        className="no-underline text-xl text-white text-base font-normal"
      >
        Support
      </Link>
    </div>
  </header>
)

const StickySectionBar = ({ currentSection }: { currentSection: string }) => (
  <div className="sticky top-0 bg-mature_blue text-white h-16 p-4 flex items-center z-10 text-xl">
    <div className="md:flex flex-1">
      <ul className="flex space-x-8">
        {DummyData.map((section) => (
          <li key={section.section}>
            <Link
              href={`/Pages/${section.section}`}
              className={`${
                currentSection === section.section ? 'underline-custom' : ''
              }`}
            >
              {section.section}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const Footer = () => (
  <footer className="bg-gray-800 text-white text-center p-4 mt-auto z-10">
    <p>www.chargebee.com</p>
  </footer>
)

const Layout: React.FC<LayoutProps> = ({ children, docsData }) => {
  const pathname = usePathname()
  const currentSection = useMemo(() => pathname.split('/')[2] || '', [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <StickySectionBar currentSection={currentSection} />
      <main className="flex-grow p-4 md:mr-20rem md:ml-12rem">
        {React.cloneElement(children as React.ReactElement, { currentSection })}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
