import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { type Testimonial } from "./TestimonialData";

export default function TestimonialCard({
  content,
  image,
  name,
  kWh
}: Testimonial) {
  return (
    <Card className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 w-80 min-h-96 flex flex-col justify-between">
      <CardContent className="p-6 mt-20 flex flex-col justify-between">
        <p className="text-blacked leading-relaxed mb-6 text-lg line-clamp-6">
          {content}
        </p>
        
        <div className="flex items-center gap-3 mt-auto">
          <Image
            src={image}
            alt={`${name}'s profile picture`}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {name}
            </span>
            <span className="text-sm text-slate-600">
              {kWh}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}