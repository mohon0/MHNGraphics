import Marquee from "react-fast-marquee";

export default function BloodDonateNotice() {
  return (
    <div>
      <Marquee
        pauseOnHover={true}
        className="col-span-9 h-full border-y border-l border-r border-primary font-bold md:border-l-0 md:text-xl lg:col-span-10"
      >
        <span>জরুরী প্রয়োজনে কল করুনঃ</span>
        <span>
          মোঃ মোহন (সভাপতি) ০১৯৮৯-৪৯১২৪৮, ০১৭৯৯-৫৭৪৫৭০ // মোঃ সুমন (সহ-সভাপতি)
          ০১৩০৩-৯৫৩৪৪১ //
        </span>
        <span>হাবিবুর রহমান (সাধারণ সম্পাদক) ০১৫৭১-২০৯১৭৮।।</span>
      </Marquee>
    </div>
  );
}
