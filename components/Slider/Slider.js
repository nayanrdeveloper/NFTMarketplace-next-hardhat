import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

function Slider() {
  const SliderImageLIst = [
    "/design1.webp",
    "/design2.webp",
    "/design3.webp",
    "/design4.webp",
    "/design7.jpg",
    "/design8.webp",
    "/design10.jpg",
    "/dsign_9.webp",
  ];
  return (
    <div className="container py-16">
      <div className="">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={2}
          navigation
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {SliderImageLIst.map((NFTImage, index) => {
            return (
              <SwiperSlide key={index}>
                <Image src={NFTImage} alt="design2" width={1100} height={550} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;