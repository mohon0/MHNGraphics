import { StaticImageData } from "next/image";

export type TestimonialType = {
  id: number;
  name: string;
  image: StaticImageData; // Since you're using next/image
  company: string;
  position: string;
  title: string;
  duration: string;
  description: string;
};
