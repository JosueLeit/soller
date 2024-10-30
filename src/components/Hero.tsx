import React from 'react';
import Image from 'next/image';
import PurpleButton from './ui/PurpleButton';
import maskMasked from '../../public/assets/maskMasked.png';
import EmblaCarousel from './EmblaCarousel';

const Hero = () => {
  return (
    <React.Fragment>
      <div className="grid md:px-12 py-12 flex-col md:flex-row items-center justify-between overflow-ellipsis">
        <div className="flex items-start py-0 justify-between md:flex-row">
          <div className="space-y-6 max-w-xl text-left">
            <h1 className="text-7xl md:text-6xl font-extrabold text-blacked">Get the Sun to Power Your Home</h1>
            <p className="text-2xl text-blacked text-left">Viverra viverra nibh enim et aliquam, enim. Tempor, sit mus viverra orci dui consequat turpis scelerisque.</p>
            <PurpleButton />
          </div>
            <div className="bg">
            {/* <div className="bg-sky-200 relative rounded-full rotate-45 w-[615] -top-80 -right-[690] h-[860] -z-10 text-sky-200"></div> */}
            <Image 
              src={maskMasked} 
              alt="Technician working with solar panels" 
              // width={673} 
              // height={694} 
              // className="rounded-full  -top-24 absolute z-30"
              className="absolute z-1 right-1 top-2"
              />

            <div className="relative bg-sky-100 -top-96 right-52 rounded-full shadow-lg"></div>
            </div>
        </div>
      </div>
        <EmblaCarousel />
    </React.Fragment>
  )
}

export default Hero