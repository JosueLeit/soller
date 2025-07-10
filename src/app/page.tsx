import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React, { Suspense } from "react";
import PickTheSun from "@/components/PickTheSun";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import SystemFeatures from "@/components/SystemFeatures";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import EmblaCarousel from "../components/EmblaCarousel";
import SecondHero from "../components/SecondHero";
import { Loader2 } from "lucide-react";

// Lazy load the calculator section
const CalculatorSection = React.lazy(() => import("@/components/CalculatorSection"));

export default function Home() {
  return (
  <>
    <Header />
    <section id="home">
      <Hero />
    </section>
    <section id="testimonials">
      <EmblaCarousel />
    </section>
    <section id="products">
      <PickTheSun />
    </section>
    <section id="calculator">
      <Suspense 
        fallback={
          <div className="py-20 flex justify-center items-center">
            <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
          </div>
        }
      >
        <CalculatorSection />
      </Suspense>
    </section>
    <section id="services">
      <Services />
    </section>
    <section id="solutions">
      <SystemFeatures />
    </section>
    <section id="reviews">
      <TestimonialCarousel />
    </section>
    <section id="configure">
      <SecondHero />
    </section>
    <Footer />
</> 
  );
}