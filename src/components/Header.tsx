import Link from 'next/link'
import React from 'react'
import { Headphone } from './ui/Icons'
import PurpleButton from './ui/PurpleButton'

const Header = () => {
  return (
    <header className="w-full px-4 flex items-center gap-8 md:px-12 py-6 relative z-10">
        <Link href="/" className="text-3xl text-font-blacked font-bold">
          soller
        </Link>
      <div className="container flex items-center justify-between">
 
        <nav className="hidden md:flex space-x-4">
          <Link href="#" className="text-font-blacked font-medium hover:text-orange-600">
            Products
          </Link>
          <Link href="#" className="text-font-blacked font-medium hover:text-orange-600">
            Solutions
          </Link>
          <Link href="#" className="text-font-blacked font-medium hover:text-orange-600">
            Services
          </Link>
          <Link href="#" className="text-font-blacked font-medium hover:text-orange-600">
            Configure
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 gap-4">
            <Headphone className="text-sky-700" />
            <p className="text-sky-700 font-medium">555 818 282</p>
            <PurpleButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header