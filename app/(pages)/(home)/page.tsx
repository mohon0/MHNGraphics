import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/Header/Header';
import Contact from '../contact/Contact';
import { CategorySlider } from './CategorySlider';
import DesignShowcase from './DesignShowcase';
import Hero from './Hero';
import Services from './services';

export default function Home() {
  return (
    <>
      <Header fixed />
      <Hero />
      <Services />
      <CategorySlider />
      <DesignShowcase />
      <Contact />
      <Footer />
    </>
  );
}
