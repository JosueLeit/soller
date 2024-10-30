import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react";
import PickTheSun from "@/components/PickTheSun";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import SystemFeatures from "@/components/SystemFeatures";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Home() {
  return (
    <React.Fragment>
   <Header />
   <Hero />
   <PickTheSun />
   <Services />
   <SystemFeatures />
   <TestimonialCarousel />
   <Footer />
    </React.Fragment>
  );
}