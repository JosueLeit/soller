import Image from 'next/image';
import MacBook from "../../public/assets/Macbook.png";
import YellowButton from './ui/YellowButton';

export default function Component() {
  return (
    <div className="relative min-h-[949px] w-full overflow-hidden lg:bg-purple-700 md:bg-purple-800 bg-purple-900">
     <div
        className="absolute rounded-full bg-[#A252EE] w-[150px] h-[150px]
        sm:w-[300px] sm:h-[300px] sm:-bottom-[120px]
        md:w-[500px] md:h-[500px] md:-bottom-[200px] md:-right-[100px]
        lg:w-[782px] lg:h-[780px] lg:-right-[150px] lg:-top-[290px] 
        overflow-hidden"
        />
      <div className="relative mx-auto max-w-[1520px] px-4 py-16 sm:px-6 md:px-8 lg:px-12">
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1 lg:gap-16">
              <div className="flex lg:flex-row md:flex-col sm:flex-col items-center justify-between md:gap-16 lg:gap-80">
                <div className="flex flex-col justify-center sm:mx-auto">
                    <p className="text-xl font-medium text-amber-300">Get the Sun to power your home</p>
                    <h1 className="mt-2 text-6xl font-extrabold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                      All the power that you need for your house is now available
                    </h1>
                </div>
                    <div className="flex md:lg:flex-col sm:flex-col justify-center items-center order-3 mt-8 md:mt-0">
                      <YellowButton />
                      <p className="mt-2 text-sm text-white">
                      Egestas fringilla aliquam leo
                      </p>
                    </div>
              </div>
          </div>
      </div> 
      <div className="flex  items-center justify-center">
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