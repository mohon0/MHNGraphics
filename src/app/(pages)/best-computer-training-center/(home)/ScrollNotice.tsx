import Marquee from "react-fast-marquee";

export default function ScrollNotice() {
  return (
    <div className="mx-2 my-2 flex grid-cols-1 flex-col items-center justify-center gap-4 md:grid md:grid-cols-12 md:gap-0 lg:mx-10">
      <div className="flex w-full items-center justify-center text-center gap-2 rounded-md bg-primary-100 p-1 md:col-span-3 lg:col-span-2">
        <div className="animate-pulse text-lg font-bold text-white">
          <p>বেস্ট কম্পিউটার</p>
          <p>ট্রেনিং সেন্টার</p>
        </div>
      </div>
      <Marquee
        pauseOnHover={true}
        className="col-span-9 h-full border-y border-l border-r border-primary font-bold md:border-l-0 md:text-xl lg:col-span-10"
      >
        সবাইকে দক্ষ করে গড়ে তোলায় আমাদের একমাত্র লক্ষ্য। ঝিনাইদহ শহরে একমাত্র
        আমরাই আপনাদের সার্বক্ষণিক পাশে আছি। আপনাদের যে কোন সমস্যা জানাতে সরাসরি
        চলে আসুন আমাদের অফিসে। ঠিকানাঃ রফি টাওয়ার (১০ তলা ভবনের ৪র্থ তলা) অথবা
        কল করুনঃ 01989-491248, Gmail: bestcomputer.jhenaidah@gmail.com
      </Marquee>
    </div>
  );
}
