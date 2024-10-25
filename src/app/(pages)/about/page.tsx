import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/footer/Footer";
import Services from "@/components/pages/about/services/Services";
import ToolsSkills from "@/components/pages/about/skills/ToolsSkills";
import Testimonials from "@/components/pages/about/testimonials/Testimonials";

export default function about() {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <Services />
        <ToolsSkills />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
