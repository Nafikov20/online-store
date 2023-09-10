'use client'
import React, {Fragment} from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import people from "@/shared/data/data";



export const MainSlider = () => {

  return (

    <Fragment>
       <section className="section mySwiper mt-[-96px]">
           <Swiper
               className="section-center"
               spaceBetween={30}
               centeredSlides={true}
               autoplay={{
                   delay: 4000,
                   disableOnInteraction: false,
               }}
               pagination={{
                   clickable: true,
               }}
               navigation={true}
               modules={[Autoplay, Pagination, Navigation]}
           >
               {people.map((person: { image: any; name: any; title: any; }, personIndex: number) => {
                   const { image, name, } = person;
                   return (
                       <SwiperSlide key={personIndex}>
                           <article className='article__slider'>
                               <Image src={image} alt={name} fill={true}  className="person-img" />
                           </article>
                       </SwiperSlide>
                   )
               })}

           </Swiper>
       </section>
    </Fragment>
  );
};
