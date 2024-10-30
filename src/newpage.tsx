import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Zap, Shield, Cpu } from 'lucide-react'
import clsx from 'clsx'
import maskMasked from '../../public/assets/MaskMasked.png';
// import userThumb1 from '../../public/assets/User Thumb (1).png';
import userThumb2 from '../../public/assets/User Thumb (2).png';
import Desktop from '../../public/assets/Desktop.png';
import mobileApp from '../../public/assets/Mobile-App-Placeholder-1.png';
import mackbook from '../../public/assets/Macbook.png';
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import PurpleButton from '@/components/ui/PurpleButton'


const testimonials = [
  { name: "Joel Casali", role: "Solar Enthusiast", content: "Soller transformed our home into an energy-efficient paradise. We couldn't be happier!" },
  { name: "Sarah Johnson", role: "Homeowner", content: "Switching to solar was the best decision we've made for our home and the environment." },
  { name: "Michael Lee", role: "Business Owner", content: "The cost savings and environmental impact have been significant for our company." },
  { name: "Emily Davis", role: "Eco-Activist", content: "Soller's commitment to sustainable energy aligns perfectly with my values." },
  { name: "David Wilson", role: "Tech Enthusiast", content: "The smart features and monitoring capabilities are impressive and user-friendly." },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background px-4 w-full">
      <div className="bg-sky-200 rounded-full rotate-45 w-[615] -right-14 -top-56 h-[820] z-1 text-sky-200"></div>
       <Header />
       <main className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
        <section className="px-8 flex items-start py-0 justify-between md:flex-row">
          <div className="space-y-6 max-w-xl text-left">
            <h1 className="text-7xl md:text-6xl font-extrabold text-blacked">Get the Sun to Power Your Home</h1>
            <p className="text-2xl text-blacked text-left">Viverra viverra nibh enim et aliquam, enim. Tempor, sit mus viverra orci dui consequat turpis scelerisque.</p>
            <PurpleButton />
          </div>
            <div className="max-w-xl flex items-start">
            <Image 
              src={maskMasked} 
              alt="Technician working with solar panels" 
              // width={673} 
              // height={694} 
              // className="rounded-full -right-10 -top-24 absolute z-30"
              className="relaltive rounded-full z-10"
            />
            <div className="relative bg-sky-100 -top-96 right-52 rounded-full shadow-lg"></div>
            </div>
        </section>
        </main>

       

        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pick the Sun</h2>
            <p className="text-xl text-gray-600">Et pulvinar nec interdum tempus id vitae molestie porta habitant. A volutpat ipsum sed ligula pulvinar nunc eu tincidunt elementum sollicitudin.</p>
          </div>
          <div className="flex justify-center">
            <Image 
              src={Desktop} 
              alt="Solar energy app interface" 
              width={800} 
              height={400} 
              className="rounded-full shadow-lg"
            />
          </div>
        </section>

        <section className="bg-gradient-to-r from-orange-100 to-purple-100 py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Personalized services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <service.icon className="w-12 h-12 text-orange-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful features</h2>
              <p className="text-xl text-gray-600 mb-8">Tristique senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc.</p>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Sun className="w-6 h-6 text-orange-600 mr-2 mt-1" />
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <Image 
                src={mobileApp} 
                alt="Mobile app interface" 
                width={500} 
                height={700} 
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>
        </section>

        <section className="bg-purple-700 text-white py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Make something awesome</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className={clsx("bg-purple-600", index === 0 && "md:col-span-2 md:row-span-2")}>
                  <CardContent className="p-6">
                    <blockquote className="text-lg mb-4">{testimonial.content}</blockquote>
                    <div className="flex items-center">
                      <Image src={userThumb2} alt={testimonial.name} width={50} height={50} className="rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-purple-200">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">All the power that you need for your house is now available</h2>
          <Image 
            src={mackbook} 
            alt="Solar power device" 
            width={600} 
            height={400} 
            className="mx-auto mb-8"
          />
          <Button variant="default" size="lg" className="mb-4">Request a Quote</Button>
          <p className="text-gray-600">Egestas integer eget aliquet nibh praesent tristique.</p>
        </section>
        <Footer />
    </div>
  )
}