import Link from 'next/link'
import React from 'react'
import { Headphone } from './ui/Icons'
import PurpleButton from './ui/PurpleButton'

const Header = () => {
  return (
      <header className="w-full md:px-12 py-6 flex items-center justify-between z-50">
        <div className="flex items-center space-x-10">
          <Link href="/" className="text-3xl text-font-blacked font-bold">
            <p>soller</p>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="#" className="text-font-blacked font-medium hover:text-orange-600">Products</Link>
            <Link href="#" className="text-font-blacked font-medium hover:text-orange-600">Solutions</Link>
            <Link href="#" className="text-font-blacked font-medium hover:text-orange-600">Services</Link>
            <Link href="#" className="text-font-blacked font-medium hover:text-orange-600">Configure</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4 gap-4 z-20">
          <Headphone className="text-sky-700 font-medium hidden md:block"/>
          <p className="text-sky-700 font-medium hidden md:block">555 818 282</p>
          <PurpleButton />
        </div>
      </header>
  )
}

export default Header