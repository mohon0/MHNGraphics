import Link from "next/link";

const AnimatedButton = () => {
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row">
      <Link
        href="/best-computer-training-center/application"
        className="shadow-custom flex h-fit animate-pulse items-center gap-3 rounded-full border-4 bg-primary-100 px-8 py-4 text-lg text-white"
      >
        <p>আবেদন করুন</p>
        <p className="h-2 w-2 animate-ping rounded-full bg-primary-300"></p>
      </Link>
      <div className="border border-black p-2">
        <p className="mb-2 border-b-2 border-b-black">
          আবেদনের জন্য প্রয়োজনীয় কাগজপত্র
        </p>
        <p>১. পাসপোর্ট সাইজের এক কপি রঙিন ছবি </p>
        <p>২. এস.এস.সি/জে.এস.সি মার্কশীটের ফটোকপি</p>
        <p>৩. এন.আই.ডি/জন্ম নিবন্ধনের ফটোকপি</p>
      </div>
    </div>
  );
};

export default AnimatedButton;
