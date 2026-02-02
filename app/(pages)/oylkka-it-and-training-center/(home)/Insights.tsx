'use client';
import { FaCrown, FaUserCheck } from 'react-icons/fa';
import { FaSheetPlastic, FaUsers } from 'react-icons/fa6';
import { ImStatsDots } from 'react-icons/im';
import InsightsModel from './InsightsModel';
import SectionHeader from './SectionHeader';

export default function Insights() {
  return (
    <div className='my-20 flex flex-col items-center justify-center gap-10 px-2 text-center'>
      <SectionHeader
        title='আমাদের প্রতিষ্ঠানের পরিসংখ্যান'
        text='আমাদের প্রতিষ্ঠান থেকে কোর্স শেষ করা হলে বাংলাদেশ কারিগরি শিক্ষা বোর্ড কর্তৃক পরীক্ষার মাধ্যমে
          সার্টিফিকেট প্রদান করা হয়'
        icon={ImStatsDots}
      />

      <div className='grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-20'>
        <InsightsModel
          end={2230}
          label='মোট শিক্ষার্থী'
          icon={FaUsers}
          start={2000}
        />
        <InsightsModel
          end={120}
          label='বর্তমান শিক্ষার্থী'
          icon={FaUserCheck}
          start={100}
        />

        <InsightsModel
          end={8}
          label='মোট কোর্স'
          icon={FaSheetPlastic}
          start={0}
        />
        <InsightsModel end={10} label='সফলতার বছর' icon={FaCrown} start={0} />
      </div>
    </div>
  );
}
