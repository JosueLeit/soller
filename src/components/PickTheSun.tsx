import React from 'react';
import Image from 'next/image';
import Desktop from '../../public/assets/Desktop.png';

const PickTheSun = () => {
  return (
    <div className="relative w-full mx-auto px-4 py-12 overflow-hidden">
    <div className="absolute -left-[220] w-[710] h-[711] bg-amber-500 rounded-full" />
    <div className="absolute -right-6 bottom-1/4 w-[596] h-[597] bg-purple-700 rounded-full" />
      <div className="relative justify-items-center z-10">
            <p className="text-amber-600 text-sm font-medium mb-2">No more waste</p>
            <h1 className="text-[3.5rem] text-blacked font-extrabold mb-4">Pick the Sun</h1>
            <p className="text-blacked mb-8 max-w-2xl">
              Et pulvinar nec pretium integer id urna molestie porta nullam. A, donec ornare sed turpis pulvinar
              purus maecenas quam a. Est porttitor pharetra sed in mauris elementum sollicitudin.
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
  </div>
  )
}

export default PickTheSun


{/* <div className="grid justify-between mt-24">
      <div className="relative rounded-full w-[710] h-[711] bg-amber-500"></div>
      <Image 
        src={Desktop} 
        alt="Technician working with solar panels" 
        width={1520} 
        height={854} 
        // className="rounded-full  -top-24 absolute z-30"
        className=""
      />
      <div className="relative rounded-full w-[710] h-[711] bg-purple-700"></div>
    </div> */}