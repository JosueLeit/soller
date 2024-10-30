import React from 'react';
import Image from 'next/image';
import Desktop from '../../public/assets/Desktop.png';

const PickTheSun = () => {
  return (
    <section className="relative w-full mx-auto px-4 py-12 overflow-hidden">
    <div
      className="absolute rounded-full bg-amber-500 w-[200px] h-[200px]
      sm:w-[400px] sm:h-[400px]
      lg:w-[600px] lg:h-[600px]
      -left-[220] -top-3/3"
    />

    <div
      className="absolute rounded-full bg-purple-700 w-[150px] h-[150px]
      sm:w-[300px] sm:h-[300px]
      lg:w-[450px] lg:h-[450px]
       -right-6 bottom-1/4"
      />

    <div className="relative z-10 max-w-7xl mx-auto text-center">
      <p className="text-amber-600 text-sm font-medium mb-2">No more waste</p>
      <h1 className="text-4xl md:text-5xl text-blacked font-extrabold mb-4">
        Pick the Sun
      </h1>
      <p className="text-blacked mb-8 max-w-2xl mx-auto">
        Et pulvinar nec pretium integer id urna molestie porta nullam. A,
        donec ornare sed turpis pulvinar purus maecenas quam a. Est porttitor
        pharetra sed in mauris elementum sollicitudin.
      </p>
      
      <div className="rounded-lg overflow-hidden">
          <Image
            src={Desktop}
            alt="Application interface"
            width={1520}
            height={813}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}

export default PickTheSun
