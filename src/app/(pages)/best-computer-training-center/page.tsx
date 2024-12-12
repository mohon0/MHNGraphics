import Courses from "./Course";
import FeedBack from "./FeedBack";
import Gallery from "./Gallery";
import Insights from "./Insights";
import Members from "./Members";
import Notice from "./Notice";
import Payment from "./Payment";
import ScrollNotice from "./ScrollNotice";
import Services from "./Service";
import { Slider } from "./Slider";
import WorkPlace from "./WarkPlace";
import WhyUs from "./WhyUs";

export default function page() {
  return (
    <div className="overflow-x-clip">
      <Slider />
      <ScrollNotice />
      <Notice />
      <Courses />
      <Services />
      <WhyUs />
      <Insights />
      <Members />
      <div className="mx-2 my-16 grid grid-cols-1 gap-10 md:mx-24 md:grid-cols-2 md:gap-20">
        <FeedBack />
        <Gallery />
      </div>
      <WorkPlace />
      <Payment />
    </div>
  );
}
