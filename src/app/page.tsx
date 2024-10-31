import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react";
import PickTheSun from "@/components/PickTheSun";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import SystemFeatures from "@/components/SystemFeatures";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import EmblaCarousel from "../components/EmblaCarousel";
import SecondHero from "../components/SecondHero";

export default function Home() {
  return (
  <>
    <Header />
    <Hero />
    <EmblaCarousel />
    <PickTheSun />
    <Services />
    <SystemFeatures />
    <TestimonialCarousel />
    <SecondHero />
    <Footer />
</> 
  );
}