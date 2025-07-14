import { Badge } from "@/components/ui/badge";
import img from "@/images/best-computer/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="relative mb-16 mt-6 overflow-hidden rounded-xl bg-linear-to-r from-primary via-primary/90 to-primary p-6 text-white shadow-lg md:p-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/10"></div>

      <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <Badge
            variant="outline"
            className="mb-4 border-white/20 bg-white/10 text-white"
          >
            রক্তযোদ্ধা পরিবার, ঝিনাইদহ
          </Badge>
          <h1 className="mb-2 text-3xl font-bold text-red-500 md:text-4xl lg:text-5xl">
            রক্তদান করুন, জীবন বাঁচান
          </h1>
          <p className="mb-4 max-w-md text-white/80">
            আমরা পেরেছি, আমরাই পারবো, রক্ত দিয়ে অসহায় মানুষের পাশে দাড়াবো
          </p>
        </div>

        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 md:h-40 md:w-40">
          <Image
            src={img || "/placeholder.svg"}
            alt="রক্তযোদ্ধা লোগো"
            className="object-contain"
            fill
            sizes="160px"
          />
        </div>
      </div>
    </div>
  );
}
