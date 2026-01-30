import { FaStar } from 'react-icons/fa6';
import type { Testimonial } from '@/utils/Interface';

export const TestimonialContent = ({ review }: { review: Testimonial }) => (
  <div className='white-bg dark:dark-bg mx-10 my-10 rounded-lg px-2 py-3 md:mt-20 md:px-10 md:py-12'>
    <div className='flex flex-col items-center justify-between gap-3 md:flex-row'>
      <div>
        <h3 className='mb-2 text-2xl font-medium'>{review.title}</h3>
        <span className='font-medium text-muted-foreground'>
          {review.duration}
        </span>
      </div>
      <div className='white-bg dark:dark-bg flex gap-1 rounded px-3 py-2 text-xs text-yellow-500'>
        {[...Array(5)].map((_, i) => (
          // biome-ignore lint: error
          <FaStar key={i} />
        ))}
      </div>
    </div>
    <p className='mt-11 leading-8 text-muted-foreground'>
      {review.description}
    </p>
  </div>
);
