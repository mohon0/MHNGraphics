import img2 from "@/images/best-computer/img1.jpg";
import img1 from "@/images/best-computer/img2.jpg";
import img3 from "@/images/best-computer/img3.jpg";
import Image from "next/image";

import { StaticImageData } from "next/image";

export default function MemberModel({
  img,
  name,
  title,
  number,
  number2,
}: BloodMemberType) {
  return (
    <div className="flex gap-4">
      <Image src={img} alt="" width="100" />
      <div>
        <p className="text-xl font-bold text-primary">{name}</p>
        <p>{title}</p>
        <p>{number}</p>
        {number2 && <p>{number2}</p>}
      </div>
    </div>
  );
}

export const MemberModelData = [
  {
    id: 1,
    name: "মোঃ মোহন",
    title: "সভাপতি",
    number: "০১৯৮৯-৪৯১২৪৮",
    number2: "০১৭৯৯-৫৭৪৫৭০",
    img: img1,
  },
  {
    id: 2,
    name: "মোঃ সুমন ",
    title: "সহ-সভাপতি",
    number: "০১৩০৩-৯৫৩৪৪১",
    img: img3,
  },
  {
    id: 3,
    name: "হাবিবুর রহমান",
    title: "সাধারণ সম্পাদক",
    number: "০১৫৭১-২০৯১৭৮",
    img: img2,
  },
];

export interface BloodMemberType {
  img: StaticImageData;
  name: string;
  title: string;
  number: string;
  number2: string | undefined;
}
