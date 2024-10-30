import React from 'react';
import Image from 'next/image';
import PurpleButton from './ui/PurpleButton';
import maskMasked from '../../public/assets/maskMasked.png';

const Hero = () => {
  return (
  <>
  <section className="relative ">
   
    <div className="absolute -top-24 right-0">
      <Image
        src={maskMasked}
        alt="Technician working with solar panels"
        className="w-[300px] md:w-[600px]"
        priority
      />
    </div>

    <div className="container space-y-6 max-w-xl text-left flex flex-col gap-8 items-start justify-center px-4 md:px-12 py-12">
      <h1 className="mt-48 text-7xl md:mt-0 md:text-5xl font-extrabold text-blacked">
        Get the Sun to Power Your Home
      </h1>
      <p className="text-xl md:text-2xl text-blacked mt-4">
        Viverra viverra nibh enim et aliquam, enim. Tempor, sit mus viverra orci dui consequat turpis scelerisque.
      </p>
      <PurpleButton />
    </div>
  </section>

 </>
  )
}

export default Hero


