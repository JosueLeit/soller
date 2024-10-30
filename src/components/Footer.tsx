import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoContainer from '../../public/assets/LogoContainer.png';

const Footer = () => {
  return (
    <React.Fragment>
      {/* <footer className="flex items-center justify-between bg-white text-black px-20 h-24"> */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-between bg-white text-black px-4 md:px-8 py-6">
        <div className="flex items-center container gap-">
            <Link href="/" className="flex items-center text-black my-auto gap-5">
              <Image
                src={logoContainer}
                alt="Solar power device" 
                width={126.81} 
                height={32} 
                // className="my-auto"
                />
                <p>
                  &copy; 2023 Soller, Inc. All rights reserved.
                </p>
            </Link>
            
          </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
            <nav className="flex justify-center gap-4">
              {/* <Link href="#" className="hover:text-orange-500">Home</Link> */}
              <Link href="#" className="hover:text-orange-500">Terms</Link>
              <Link href="#" className="hover:text-orange-500">Privacy</Link>
              <Link href="#" className="hover:text-orange-500">Support</Link>
            </nav>
        </div>
      </footer>
    </React.Fragment>
  )
}

export default Footer