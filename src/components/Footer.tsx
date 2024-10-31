import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoContainer from '../../public/assets/LogoContainer.png';

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="grid w-full border-t bg-white px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex sm:flex-col items-center gap-2">
              <Link href="/" className="flex items-center text-black my-auto gap-5">
                  <Image
                    src={logoContainer}
                    alt="Solar power device" 
                    width={126.81} 
                    height={32} 
                    className="h-8 w-auto"
                    />
                    <p>
                      &copy; 2023 Soller, Inc. All rights reserved.
                    </p>
                </Link>
            </div>
          
            <div className="flex flex-col md:flex-row justify-between items-center">
                <nav className="flex justify-center gap-4">
                  <Link href="#" className="hover:text-orange-500">Terms</Link>
                  <Link href="#" className="hover:text-orange-500">Privacy</Link>
                  <Link href="#" className="hover:text-orange-500">Support</Link>
                </nav>
            </div>
          </div>
      </footer>
    </React.Fragment>
  )
}

export default Footer