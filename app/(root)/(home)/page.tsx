import React from 'react'
import MeetingTypeList from '../../../components/MeetingTypeList';

const Page = () => {
  const now=new Date();


  const time = now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  const date = (new Intl.DateTimeFormat('en-IN',{dateStyle:"full"}) ).format(now);

  return (
    <section className='flex size-full flex-col gap-5 text-white'>
      <div className="w-full h-[200px] rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-around gap-5 max-md:px-5 max-md:py-8 lg:p-11 ">
          <h2 className='glassmorphism max-w-[250px] mt-[-20px] rounded  text-center text-base font-normal'>Upcoming Meeting At : 12:30PM</h2>
          <div className='flex flex-col gap-2  pt-5'>
            <h1 className='text-4xl font-extrabold lg:text-5xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-` lg:text-2xl'>{date}</p>

          </div>

        </div>

      </div>

        <MeetingTypeList/>

    </section>
  )
}

export default Page;