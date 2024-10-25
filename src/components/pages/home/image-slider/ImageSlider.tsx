import img1 from "@/images/slider/img1.jpeg";
import img2 from "@/images/slider/img2.jpeg";
import img3 from "@/images/slider/img3.jpeg";
import img4 from "@/images/slider/img4.jpeg";
import img5 from "@/images/slider/img5.jpeg";
import img6 from "@/images/slider/img6.jpeg";
import img7 from "@/images/slider/img7.jpeg";
import img8 from "@/images/slider/img8.jpeg";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function ImageSlider() {
  return (
    <div className="my-20 space-y-6">
      <p className="mb-10 text-center text-4xl font-bold">
        View Design & Sell Content
      </p>
      <Marquee pauseOnHover={true} speed={40}>
        <Image src={img1} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img2} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img3} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img4} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img5} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img6} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img7} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img8} alt="" className="h-40 w-full object-cover pl-4" />
      </Marquee>
      <Marquee pauseOnHover={true} direction="right" speed={50}>
        <Image src={img1} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img2} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img3} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img4} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img5} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img6} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img7} alt="" className="h-40 w-full object-cover pl-4" />
        <Image src={img8} alt="" className="h-40 w-full object-cover pl-4" />
      </Marquee>
    </div>
  );
}
