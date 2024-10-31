import Image from 'next/image';
import MacBook from "../../public/assets/Macbook.png";
import YellowButton from './ui/YellowButton';

export default function Component() {
  return (
    <div className="relative min-h-[949px] w-full overflow-hidden lg:bg-purple-700 bg-purple-900">
     <div
        className="absolute rounded-full bg-[#A252EE] w-[150px] h-[150px]
        sm:w-[300px] sm:h-[300px] sm:-bottom-[120]
        lg:w-[782px] lg:h-[780px] lg:-right-[150] lg:-top-[290] 
        overflow-hidden"
        />
      <div className="relative mx-auto max-w-[1520] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-1 lg:gap-16">
              <div className="flex lg:flex-row sm:flex-col items-center justify-between gap-80">
                <div className="flex flex-col justify-center sm:mx-auto">
                    <p className="text-xl font-medium text-amber-300">Get the Sun to power your home</p>
                    <h1 className="mt-2 text-6xl font-extrabold text-white sm:text-4xl md:text-5xl">
                      All the power that you need for your house is now available
                    </h1>
                </div>
                    <div className="flex flex-col justify-center items-center order-3">
                      <YellowButton />
                      <p className="mt-2 text-sm text-purple-100">
                      Egestas fringilla aliquam leo
                      </p>
                    </div>
              </div>
          </div>
      </div> 
      <div className="flex items-center justify-center">
      <Image 
          src={MacBook} 
          alt="Computer interface showing power management dashboard" 
          className="z-30"
          height="555"
          width="1008"
        />
      </div>
    </div>
  )
}