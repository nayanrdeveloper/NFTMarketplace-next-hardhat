import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

function StatisticsCard({data}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  })
  return (
    <div data-aos="fade-down">
        <div className='bg-[#24243557] text-center my-auto p-20 rounded-md border border-[#ffffff14]'>
            <span className='text-3xl font-bold text-[#00a3ff]'>{data.count}</span>
            <p className='text-white'>{data.title}</p>
        </div>
    </div>
  )
}

export default StatisticsCard