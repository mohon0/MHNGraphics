'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DesignSkeleton from './DesignSkeleton';

function UnSubscribe() {
  const searchParams = useSearchParams();
  const mail = searchParams.get('mail');
  const router = useRouter();

  async function handleUnsubscribe() {
    try {
      toast.loading('Please wait...');
      const response = await axios.delete(
        `/api/dashboard/subscribe?mail=${mail}`,
      );
      if (response.status === 200) {
        toast.dismiss();
        toast.success('Unsubscribed successfully');
        router.push('/');
      }
      // biome-ignore lint: error
    } catch (error) {
      toast.dismiss();
      toast.error('Unsubscribed error');
    }
  }
  return (
    <Card className='mx-2 my-4 p-1 shadow-2xl md:mx-auto md:max-w-xl'>
      <div className='inner-container'>
        {/* biome-ignore lint: error */}
        <svg
          id='svg'
          data-name='Layer 1'
          className='scale-75'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 590 484.7'
        >
          <g id='blobs'>
            <path
              id='blob-1'
              d='M545.5,299c0,80.3-28.6,150.4-126.4,139.4-63.2-7.1-109.3-37.3-142.6-37.3-45.7,0-105.4,29.3-146.8,22.2-69-11.7-85.3-66.8-85.3-135.8,0-56.3,25.5-99.9,46.2-140.8,18.3-36.1,55.9-97.8,125.1-100.5,53.3-2.1,97.4,50.5,138.4,74.2,49.9,28.8,98.4-1.8,126,1.3C537.9,127.9,545.5,265.5,545.5,299Z'
              fill='#eddfeb'
            />
          </g>
          <g id='confetti' className='confetti'>
            <rect
              x='284'
              y='230.4'
              width='17.7'
              height='17.67'
              rx='4'
              ry='4'
              fill='#543093'
            />
            <rect
              x='284'
              y='230.4'
              width='17.7'
              height='17.67'
              rx='4'
              ry='4'
              fill='#543093'
            />
            <rect
              x='285.4'
              y='231.7'
              width='17.7'
              height='17.67'
              rx='4'
              ry='4'
              fill='#fff'
            />
            <rect
              x='285.4'
              y='231.7'
              width='17.7'
              height='17.67'
              rx='4'
              ry='4'
              fill='#fff'
            />
            <rect
              x='285.4'
              y='230.1'
              width='17.7'
              height='17.67'
              rx='4'
              ry='4'
              fill='#d960ae'
            />
            <rect
              x='285.4'
              y='230.1'
              width='17.7'
              height='17.67'
              rx='4'
              ry='4'
              fill='#d960ae'
            />
            <rect
              x='285.4'
              y='231.7'
              width='17.7'
              height='17.67'
              rx='4'
              ry='4'
              fill='#f3c1df'
            />
            <rect
              x='285.4'
              y='231.7'
              width='17.7'
              height='17.67'
              rx='4'
              ry='4'
              fill='#f3c1df'
            />
            <circle cx='294.1' cy='241.3' r='9.7' fill='#543093' />
            <circle
              cx='294.1'
              cy='243.6'
              r='12'
              fill='none'
              stroke='#fff'
              strokeMiterlimit='10'
              strokeWidth='2'
            />
            <circle cx='294.2' cy='243.6' r='12' fill='#fff' />
            <circle
              cx='294.2'
              cy='243.6'
              r='12'
              fill='none'
              stroke='#fff'
              strokeMiterlimit='10'
              strokeWidth='2'
            />
            <circle
              cx='294.2'
              cy='243.6'
              r='12'
              fill='none'
              stroke='#d960ae'
              strokeMiterlimit='10'
              strokeWidth='2'
            />
            <circle
              cx='294.2'
              cy='243.6'
              r='12'
              fill='none'
              stroke='#d960ae'
              strokeMiterlimit='10'
              strokeWidth='2'
            />
            <circle
              cx='295.9'
              cy='242.1'
              r='12'
              fill='none'
              stroke='#543093'
              strokeMiterlimit='10'
              strokeWidth='2'
            />
            <circle
              cx='295.9'
              cy='242.1'
              r='12'
              fill='none'
              stroke='#543093'
              strokeMiterlimit='10'
              strokeWidth='2'
            />
            <circle cx='294.1' cy='241.3' r='9.7' fill='#d960ae' />
            <circle cx='294.1' cy='241.3' r='9.7' fill='#d960ae' />
            <circle cx='292.9' cy='241.3' r='9.7' fill='#fff' />
            <circle cx='294.1' cy='241.3' r='9.7' fill='#d960ae' />
            <circle cx='294.1' cy='241.3' r='9.7' fill='#543093' />
            <circle cx='294.1' cy='241.3' r='9.7' fill='#d960ae' />
            <circle cx='294.1' cy='241.3' r='9.7' fill='#543093' />
            <circle cx='294.1' cy='241.3' r='9.7' fill='#543093' />
            <path
              d='M300.9,243.2l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.2Z'
              fill='#f3c1df'
            />
            <path
              d='M300.9,243.2l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.2Z'
              fill='#543093'
            />
            <path
              d='M300.9,243.2l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.2Z'
              fill='#d960ae'
            />
            <path
              d='M300.9,243.2l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.2Z'
              fill='#f3c1df'
            />
            <path
              d='M300.9,243.2l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.2Z'
              fill='#fff'
            />
            <path
              d='M300.9,243.2l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.2Z'
              fill='#543093'
            />
            <path
              d='M300.9,243.1l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.1Z'
              fill='#d960ae'
            />
            <path
              d='M300.9,243.1l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.1Z'
              fill='#f3c1df'
            />
            <path
              d='M300.9,243.2l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.2Z'
              fill='#543093'
            />
            <path
              d='M300.9,243.2l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.2Z'
              fill='#d960ae'
            />
            <path
              d='M300.9,243.2l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.2Z'
              fill='#f3c1df'
            />
            <path
              d='M300.9,243.2l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.2Z'
              fill='#fff'
            />
            <path
              d='M300.9,243.1l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.1Z'
              fill='#d960ae'
            />
            <path
              d='M300.9,243.1l-3-3a1.5,1.5,0,0,1,0-2.1l3-3a2,2,0,0,0,.3-2.5,1.9,1.9,0,0,0-2.9-.3l-3.1,3.1a1.5,1.5,0,0,1-2.1,0l-3-3a2,2,0,0,0-2.5-.3,1.9,1.9,0,0,0-.3,2.9l3.1,3.1a1.5,1.5,0,0,1,0,2.1l-3,3a2,2,0,0,0-.3,2.5,1.9,1.9,0,0,0,2.9.3l3.1-3.1a1.5,1.5,0,0,1,2.1,0l3.1,3.1a1.9,1.9,0,0,0,2.9-.3A2,2,0,0,0,300.9,243.1Z'
              fill='#f3c1df'
            />
          </g>
          <g id='envelope'>
            <path
              id='Background'
              d='M452.9,376.3a26.1,26.1,0,0,1-25.5,20.8H162.6a26.1,26.1,0,0,1-26-26V193.2a26.1,26.1,0,0,1,26-26H427.4a26.1,26.1,0,0,1,26,26V371.1a25.9,25.9,0,0,1-.5,5.2'
              fill='#d960ae'
              stroke='#543093'
              strokeMiterlimit='10'
              strokeWidth='5'
            />
            <g id='paper-group'>
              <rect
                id='paper'
                x='157.3'
                y='87.6'
                width='275.3'
                height='266.33'
                rx='26'
                ry='26'
                fill='#fff'
                stroke='#543093'
                strokeMiterlimit='10'
                strokeWidth='5'
              />
              <g id='face'>
                <g id='mouth'>
                  <path
                    id='mouth-worry'
                    d='M271.1,218.7c10-11.1,28.2-15,43.6-9.4'
                    fill='none'
                    stroke='#543093'
                    strokeLinecap='round'
                    strokeMiterlimit='10'
                    strokeWidth='5'
                  />

                  <g id='mouth-laughing'></g>
                </g>
                <g id='eye-group'>
                  <g id='eyes' className='eyes'>
                    <ellipse
                      id='eye-right'
                      cx='349'
                      cy='172.8'
                      rx='11.2'
                      ry='13.8'
                      fill='#543093'
                      strokeLinecap='round'
                      strokeMiterlimit='10'
                      strokeWidth='5'
                    />
                    <ellipse
                      id='eye-left'
                      cx='235.5'
                      cy='172.8'
                      rx='11.2'
                      ry='13.8'
                      fill='#543093'
                      strokeLinecap='round'
                      strokeMiterlimit='10'
                      strokeWidth='5'
                    />
                    <path
                      id='eyebrow-sad-right'
                      d='M341.9,133.7c2.6,5.3,14.8,14.1,24.3,14.7'
                      fill='none'
                      stroke='#543093'
                      strokeLinecap='round'
                      strokeMiterlimit='10'
                      strokeWidth='5'
                    />
                    <path
                      id='eyebrow-sad-left'
                      d='M240.7,133.7c-2.6,5.3-14.8,14.1-24.3,14.7'
                      fill='none'
                      stroke='#543093'
                      strokeLinecap='round'
                      strokeMiterlimit='10'
                      strokeWidth='5'
                    />
                  </g>
                </g>
              </g>
            </g>
            <path
              id='back'
              d='M451.9,186.7S322.4,288.2,313.4,294.1s-27,5.8-36.9,0S137.9,186.5,137.9,186.5a23.6,23.6,0,0,0-1.3,6.7V371.1a26.1,26.1,0,0,0,26,26H427.4a26,26,0,0,0,26-26V193.2C453.4,190.7,452.5,188.9,451.9,186.7Z'
              fill='#f3c1df'
              stroke='#543093'
              strokeMiterlimit='10'
              strokeWidth='5'
            />
            <g id='shadow'>
              <path
                id='shadow-3'
                d='M263.3,279.7s11.3-8.1,13.1-9.3c9.9-6.5,27-5.8,36.9,0,1.7,1,13.5,9.3,13.5,9.3'
                fill='none'
                stroke='#eddfeb'
                strokeLinejoin='bevel'
                strokeWidth='7'
              />
              <path
                id='shadow-2'
                d='M430.2,193.3L313.4,282.2a26.1,26.1,0,0,1-36.8,0L159.8,193.3V201l116.8,90.6c7.9,5.7,26.9,6.4,37,0l116.6-90.9v-7.4Z'
                fill='#eddfeb'
              />
            </g>
            <path
              id='shadow-1'
              d='M425.2,381.5h-262c-14.1,0-24.2-11-24.2-24.4v13.2c0,13.4,10.1,24.3,24.2,24.3h262c12.7,1.2,23.9-8.4,25.2-19.5a42.8,42.8,0,0,0,.5-4.9V358.1a14.7,14.7,0,0,1-.5,3.9C448,373.1,437.6,381.5,425.2,381.5Z'
              fill='#d960ae'
              opacity='0.5'
            />
            <g id='Front'>
              <path
                id='Front-2'
                data-name='Front'
                d='M139.8,381.9s127.5-99.5,136.5-105.4,27-5.8,36.9,0S449.8,382.1,449.8,382.1'
                fill='none'
                stroke='#543093'
                strokeMiterlimit='10'
                strokeWidth='5'
              />
              <path
                id='Front-3'
                data-name='Front'
                d='M225.4,315.3s41.9-33,51-38.9,27-5.8,36.9,0S355,307.9,355,307.9'
                fill='#f3c1df'
                stroke='#543093'
                strokeMiterlimit='10'
                strokeWidth='5'
              />
            </g>
          </g>
        </svg>

        <div className='max-w-3/4 mb-10 space-y-4 text-center'>
          <h2 className='text-2xl text-gray-600'>
            Do you want to unsubscribe?
          </h2>
          <p>
            If you unsubscribe, you will stop receiving our weekly newsletter.
          </p>
          <p />
          <div className='flex items-center justify-center gap-10'>
            <Button variant='destructive' onClick={handleUnsubscribe} size='lg'>
              Unsubscribe
            </Button>
            <Button className='hover:bg-primary-200/80' size='lg'>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<DesignSkeleton />}>
      <UnSubscribe />
    </Suspense>
  );
}
