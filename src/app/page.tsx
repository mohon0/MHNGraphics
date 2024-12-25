import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/footer/Footer";
import Contact from "@/components/pages/home/contact/Contact";
import Cta from "@/components/pages/home/cta/Cta";
import Hero from "@/components/pages/home/hero/Hero";
import ImageSlider from "@/components/pages/home/image-slider/ImageSlider";
import { Slider } from "@/components/pages/home/slider/Slider";
import State from "@/components/pages/home/state/State";

export default function Home() {
  return (
    <>
      <Header fixed />
      <Hero />
      <State />
      <Slider />
      <ImageSlider />
      <Contact />
      <Cta />
      <Footer />
    </>
  );
}
