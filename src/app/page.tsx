import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/footer/Footer";
import Contact from "@/components/pages/home/contact/Contact";
import Hero from "@/components/pages/home/hero/Hero";
import ImageSlider from "@/components/pages/home/image-slider/ImageSlider";
import { Slider } from "@/components/pages/home/slider/Slider";
import { ReactLenis } from "../lib/react-lenis";

export default function Home() {
  const lenisOptions = {
    lerp: 0.07,
    duration: 1.5,
    smoothTouch: true,
    smooth: true,
  };
  return (
    <>
      <ReactLenis root options={lenisOptions}>
        <Header fixed />
        <Hero />
        <Slider />
        <ImageSlider />
        <Contact />
        <Footer />
      </ReactLenis>
    </>
  );
}
