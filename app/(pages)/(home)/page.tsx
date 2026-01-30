import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/Header/Header';
import Contact from '../contact/Contact';
import Hero from './Hero';
import ImageSlider from './ImageSlider';
import { Slider } from './Slider';
import Services from './services';

export default function Home() {
  return (
    <>
      <Header fixed />
      <Hero />
      <Services />
      <Slider />
      <ImageSlider />
      <Contact />
      <Footer />
    </>
  );
}
