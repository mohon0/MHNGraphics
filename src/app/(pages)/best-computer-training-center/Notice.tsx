import img1 from "@/images/best-computer/bg_notice_board.png";
import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "./AnimatedButton";

export default function Notice() {
  return (
    <div className="mx-2 my-10 grid grid-cols-1 gap-10 md:mx-20 md:grid-cols-2">
      <div className="flex gap-10 overflow-hidden border bg-gradient-to-b from-gray-50 to-gray-200">
        <Image
          src={img1}
          alt="Notice Board Background"
          className="hidden h-fit w-24 md:block"
        />
        <div className="px-2 py-3 md:py-6">
          <p className="text-xl font-bold">নোটিশ বোর্ড</p>
          <div className="p-2">
            <p>Test Notice</p>

            <div className="flex items-center justify-end">
              <Link
                href="/notice"
                className="border-primary-100 rounded border px-3 py-1"
              >
                সব দেখুন
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <AnimatedButton />
      </div>
    </div>
  );
}
