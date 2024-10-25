import logo from "@/images/hero/logo3.png";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Notice() {
  return (
    <div className="mx-4 flex grid-cols-1 flex-col items-center justify-center gap-4 md:grid md:grid-cols-12 md:gap-0 lg:mx-10">
      <div className="flex w-full items-center justify-center gap-2 rounded-md bg-primary p-1 md:col-span-3 lg:col-span-2">
        <Image src={logo} alt="logo" className="h-16 w-16"></Image>
        <div className="animate-pulse text-lg font-bold text-white">
          <p>বেস্ট কম্পিউটার</p>
          <p>ট্রেনিং সেন্টার</p>
        </div>
      </div>
      <Marquee
        pauseOnHover={true}
        className="col-span-9 h-full border-y border-l border-r border-primary text-2xl font-bold md:border-l-0 lg:col-span-10"
      >
        আসসালামু আলাইকুমবেস্ট কম্পিউটার ট্রেনিং সেন্টারের পক্ষথেকে আপনাকে
        স্বাগতম। বেস্ট কম্পিউটার ট্রেনিং সেন্টারের সকল নোটিশ পেতে ও আবেদন করতে
        উপরে দেওয়া (Best Computer T.C) Navbar এ ক্লিক করুন। প্রয়োজনে সরাসরি
        যোগাযোগ করুনঃ-রফি টাওয়ার (১০ তলা ভবনের ৪র্থ তলা),পায়রা চত্ত্বর ঝিনাইদহ।
        মোবাইলঃ ০১৯৮৯-৪৯১২৪৮, ০১৭৯৯-৫৭৪৫৭০ ধন্যবাদ ।
      </Marquee>
    </div>
  );
}
