"use client";
import { BsPersonWorkspace } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { FaHandshake } from "react-icons/fa";
import { FaDigitalOcean } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";
import { GiAutoRepair } from "react-icons/gi";
import { GrAnnounce } from "react-icons/gr";
import { LuNetwork } from "react-icons/lu";
import { RiComputerLine } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import ServicesCard from "./ServicesCard";

export default function Services() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-2 py-10 text-center md:px-20">
      <SectionHeader
        title=" আমাদের সেবা সমূহ"
        text="আমাদের প্রতিষ্ঠান থেকে আপনি স্বল্পমূল্যে প্রফেশনাল মানে বিভিন্ন সেবা
          পাবেন"
        icon={FaHandshake}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-10">
        <ServicesCard
          icon={RiComputerLine}
          title="কম্পিউটার সেলস"
          description="সুলভ মূল্যে কম্পিউটারের সকল প্রকার যন্ত্রাংশ বিক্রয় করা হয়"
        />
        <ServicesCard
          icon={GiAutoRepair}
          title="কম্পিউটার সার্ভিসিং"
          description="দক্ষ ইঞ্জিনিয়ার দ্বারা কম্পিউটারের সকল সমস্যার সমাধান করা হয় "
        />
        <ServicesCard
          icon={BsPersonWorkspace}
          title="ডিজিটাল কনটেন্ট"
          description="শিক্ষা প্রতিষ্ঠান এবং অফিসের জন্য সুন্দর ও দৃষ্টি নন্দন ডিজিটাল কনটেন্ট তৈরি করা হয়"
        />
        <ServicesCard
          icon={LuNetwork}
          title="গ্রাফিক্স ডিজাইন"
          description="লোগো ব্যানার পোস্টার সহ সকল প্রকার ডিজাইনের কাজ করা হয়"
        />
        <ServicesCard
          icon={CiGlobe}
          title="ওয়েব ডিজাইন"
          description="আপনি ওয়েবসাইট তৈরির কথা ভাবছেন ? তাহলে আমাদের সাথে যোগাযোগ করুন"
        />
        <ServicesCard
          icon={FiVideo}
          title="ভিডিও এডিটিং"
          description="ভালো মানের ইউটিউব ভিডিও, ইসলামিক ভিডিও এডিটিং ও তৈরি করা হয়"
        />
        <ServicesCard
          icon={GrAnnounce}
          title="ফেসবুক মার্কেটিং"
          description="আপনার প্রতিষ্ঠানের পণ্য টার্গেট অডিয়েন্স এর কাছে পৌঁছানোর জন্য ফেসবুক অ্যাড"
        />
        <ServicesCard
          icon={FaDigitalOcean}
          title="ডিজিটাল মার্কেটিং"
          description="সোশ্যাল মিডিয়াম মার্কেটিং সহ খুব খরচের সকল প্রকার ডিজিটাল মার্কেটিং করা হয়"
        />
      </div>
    </div>
  );
}
