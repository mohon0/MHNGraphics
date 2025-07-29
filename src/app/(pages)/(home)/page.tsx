import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/Header/Header';
import Contact from '../contact/Contact';
import Hero from './Hero';
import ImageSlider from './ImageSlider';
import { Slider } from './Slider';
import State from './State';

export default function Home() {
  return (
    <>
      <Header fixed />
      <Hero />
      <State />
      <Slider />
      <ImageSlider />
      <Contact />
      <Footer />
    </>
  );
}
