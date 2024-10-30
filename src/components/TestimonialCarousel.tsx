'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import TestimonialCard from './TestimonialCard'
import { type Testimonial, TESTIMONIALS } from './TestimonialData';
import YellowButton from './ui/YellowButton'

interface CarouselProps {
  testimonials?: Testimonial[]
  options?: EmblaOptionsType
}

export default function TestimonialCarousel({ 
  testimonials = TESTIMONIALS, 
  options = { loop: true, align: 'start' } 
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    dragFree: true,
  }, [Autoplay()])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="bg-purple-900 text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div className="space-y-4">
            <p className="text-amber-300 font-medium text-xl">Join other Sun harvesters</p>
            <h2 className="text-6xl font-extrabold">Make something awesome</h2>
            <p className="max-w-2xl text-white">
              Dui euismod iaculis libero, aliquet vitae et elementum porttitor. Eleifend mi tristique
              condimentum congue fusce nunc, donec magnis commodo.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <YellowButton />
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`pl-4 flex-wrap${
                    index === 0 
                      ? 'h-[490px] w-[364px]' 
                      : 'w-[364px] h-[442px]'
                  }`}
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="top-1/2 transform -translate-y-1/2 left-0 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full border-yellow-400 text-yellow-400 hover:bg-yellow-400"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full border-yellow-400 text-yellow-400 hover:bg-yellow-400"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}