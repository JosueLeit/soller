'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import { Headphone } from './ui/Icons'
import PurpleButton from './ui/PurpleButton'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection({
    sectionIds: ['home', 'products', 'solutions', 'services', 'configure'],
    offset: 100,
  });

  const navItems = [
    { href: '#products', label: 'Products', id: 'products' },
    { href: '#solutions', label: 'Solutions', id: 'solutions' },
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#configure', label: 'Configure', id: 'configure' },
  ];

  const getLinkClassName = (id: string, isMobile = false) => {
    const baseClasses = isMobile 
      ? "block text-font-blacked font-medium hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-4 py-3 transition-colors duration-200"
      : "text-font-blacked font-medium hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors duration-200";
    const activeClasses = isMobile
      ? "text-orange-600 bg-orange-50"
      : "text-orange-600 bg-orange-50";
    
    return activeSection === id 
      ? `${baseClasses} ${activeClasses}`
      : baseClasses;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      <header className="w-full px-4 flex items-center gap-8 md:px-12 py-6 relative z-50 bg-white">
        <Link href="#home" className="text-3xl text-font-blacked font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors duration-200">
          <span className="sr-only">Soller - Solar Energy Solutions</span>
          soller
        </Link>
        
        <div className="container flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={getLinkClassName(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 gap-4">
              <Headphone className="text-sky-700" aria-hidden="true" />
              <a href="tel:555818282" className="text-sky-700 font-medium hover:text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-md px-2 py-1">
                <span className="sr-only">Call us at</span>
                555 818 282
              </a>
              <PurpleButton />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="md:hidden p-2 text-font-blacked hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleMobileMenuToggle} />
          <nav className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="p-6 pt-20">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={getLinkClassName(item.id, true)}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    onClick={handleMobileLinkClick}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Headphone className="text-sky-700 h-5 w-5" aria-hidden="true" />
                  <a href="tel:555818282" className="text-sky-700 font-medium hover:text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-md px-2 py-1">
                    555 818 282
                  </a>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    Request a Quote
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

export default Header