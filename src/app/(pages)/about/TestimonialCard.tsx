import { TestimonialType } from "@/components/interface/TestimonialType";
import Image from "next/image";

export const TestimonialCard = ({ review }: { review: TestimonialType }) => (
  <div className="white-bg dark:dark-bg mb-10 ml-10 rounded-lg p-2 py-4 md:min-w-96 md:px-8 md:py-10">
    <div className="mb-6">
      <Image
        className="h-60 w-full rounded-lg object-cover"
        src={review.image}
        alt={review.name}
      />
    </div>
    <div>
      <span className="mb-5 mt-2 text-xs font-medium uppercase tracking-widest text-primary">
        {review.company}
      </span>
      <h3 className="my-2 text-3xl font-bold">{review.name}</h3>
      <span className="text-sm">{review.position}</span>
    </div>
  </div>
);
