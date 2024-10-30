"use client";

import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { useDotButton } from '../components/EmblacarouselDotButton';
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image';

const testimonials = [
  { name: "Joel Casali", image: "/assets/JoelCasali.png", role: "Solar Enthusiast", content: "Soller transformed our home into an energy-efficient paradise. We couldn't be happier!" },
  { name: "Sarah Johnson", image: "/assets/SarahJohnson.png", role: "Homeowner", content: "Switching to solar was the best decision we've made for our home and the environment." },
  { name: "Michael Lee", image: "/assets/MichaelLee.png", role: "Business Owner", content: "The cost savings and environmental impact have been significant for our company." },
  { name: "Emily Davis", image: "/assets/EmilyDavis.png", role: "Eco-Activist", content: "Soller's commitment to sustainable energy aligns perfectly with my values." },
  { name: "Josué Leite", image: "/assets/JosueLeite.png", role: "FrontEnd Developer", content: "The smart features and monitoring capabilities are impressive and user-friendly." },
]

interface TestimonialProps {
  name: string
  image: string
  role: string
  content: string
}

type PropType = {
  slides?: TestimonialProps[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides = testimonials, options = { loop: true } }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  useDotButton(
    emblaApi,
    onNavButtonClick
  )

  return (
    <section className="embla w-full max-w-4xl">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((testimonial, index) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0 p-4" key={index}>
              {/* <div className="bg-white rounded-lg shadow-lg p-6"> */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <p className="text-lg mb-4 text-gray-700">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="embla__controls mt-4 flex justify-center">
        <div className="embla__dots flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-3 h-3 rounded-full bg-gray-300 transition-colors ${
                index === selectedIndex ? 'bg-blue-500' : ''
              }`}
            />
          ))}
        </div>
      </div> */}
    </section>
  )
}

export default EmblaCarousel
