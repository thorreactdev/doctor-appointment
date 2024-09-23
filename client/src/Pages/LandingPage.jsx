import { Button } from '@/components/ui/button'
import React from 'react'
import doctors_category from "../utils/doc_category.json";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';


const LandingPage = () => {
  const doctors_image = [
    { image: "/avatar.jpg", id: 1, name: "Dr.Mehta" },
    { image: "/avatar2.jpg", id: 2, name: "Dr.Ram" },
    { image: "/avatar3.jpg", id: 3, name: "Dr.Krishna" }
  ]
  return (

    <>
      <div className="main -z-10">
        <div className="gradient-bg" />
      </div>
      <section className="max-w-7xl p-3 mx-auto py-24 md:py-20 flex items-center justify-center flex-col gap-12">
        <h1 className="font-extrabold lg:text-[65px] md:text-5xl text-[28px] text-center leading-[40px] lg:leading-[70px] md:leading-[60px]">
          Find your doctor and  make <br /> an appointment with ease
        </h1>
        <div className='flex items-center gap-6 flex-col '>
          <div className='flex -space-x-5'>
            {doctors_image?.map((item) => (
              <TooltipProvider key={item?.id}>
                <Tooltip>
                  <TooltipTrigger>
                    <img src={item?.image} className='w-16 h-16 rounded-full border-2 border-white' />
                  </TooltipTrigger>
                  <TooltipContent>
                    {item?.name}
                  </TooltipContent>

                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <p className='text-center text-sm md:text-lg text-gray-500'>Book doctor appointments with ease. Find the right specialist, view available slots, <br className='hidden md:block' /> and schedule your visit in just a few clicks. Your health, our priority!</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="purple" className="px-24 py-7 text-base font-medium shadow-md shadow-[#fff]">
                Book Appointment &rarr;
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Book Appointment
            </TooltipContent>

          </Tooltip>

        </TooltipProvider>
      </section>

      {/* Carousel Section */}

      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full max-w-7xl mx-auto"
      >
        <CarouselContent className="">
          {doctors_category?.map((item) => (
            <CarouselItem key={item?.id} className="basis-1/3 lg:basis-1/4 flex flex-col items-center gap-2 cursor-pointer">
              <img src={item?.image} alt="" className='w-14 md:w-24' title={item?.name} />
              <span className='capitalize text-sm font-medium'>{item?.name}</span>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}

export default LandingPage
