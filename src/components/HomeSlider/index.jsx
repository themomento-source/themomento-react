import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

function HomeSlider() {
  return (
    <>
      {/* Import Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=PT+Serif&display=swap"
        rel="stylesheet"
      />

      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 15000, // 15 seconds
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full">
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
              alt="Nature Landscape"
              className="w-full h-[800px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/50 p-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-marcellus">
              Your Daily Shot of Inspiration: Submit Now for Today's Best Click!
              </h2>
              {/* <p className="text-lg md:text-xl mb-6 font-pt-serif">
                A journey through breathtaking landscapes captured by
                professionals.
              </p> */}
              <div className="flex gap-4">
                <button className="inline-block px-6 py-2 text-lg font-semibold text-gray-900 bg-[#FFCB00] hover:bg-[#e6b800] 
            transition-colors duration-300">
                  Submit Photo
                </button>
                <button className="inline-block px-6 py-2 text-lg font-semibold text-gray-900 bg-[#FFCB00] hover:bg-[#e6b800] 
            transition-colors duration-300">
                  Blog
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full">
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
              alt="City Lights"
              className="w-full h-[800px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/50 p-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-marcellus">
              Elevate Your Photography Journey: Join Momento Now!
              </h2>
              <p className="text-lg md:text-xl mb-6 font-pt-serif">
            
              </p>
              <div className="flex gap-4">
                <button className="inline-block px-6 py-2 text-lg font-semibold text-gray-900 bg-[#FFCB00] hover:bg-[#e6b800] 
            transition-colors duration-300">
                  Submit Photo
                </button>
                <button className="inline-block px-6 py-2 text-lg font-semibold text-gray-900 bg-[#FFCB00] hover:bg-[#e6b800] 
            transition-colors duration-300">
                  Blog
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default HomeSlider;