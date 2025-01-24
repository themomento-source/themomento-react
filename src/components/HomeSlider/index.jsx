import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { EffectFade, Pagination, Autoplay } from "swiper/modules";

function HomeSlider() {
  return (
    <>
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
              src="https://independent-photo.com/wp-content/uploads/2024/06/Sander-Vos-Cover-3840x1560-1.jpg"
              alt="Momento Banner"
              className="w-full h-[800px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/50 p-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Discover Stunning Photos
              </h2>
              <p className="text-lg md:text-xl mb-6">
                Browse our collection of handpicked photography and insightful
                articles.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 transition rounded-md text-white">
                  Submit Photo
                </button>
                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 transition rounded-md text-white">
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
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
              alt="Nature Landscape"
              className="w-full h-[800px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/50 p-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Make Money With Your Photos
              </h2>
              <p className="text-lg md:text-xl mb-6">
                A journey through breathtaking landscapes captured by
                professionals.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 transition rounded-md text-white">
                  Submit Photo
                </button>
                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 transition rounded-md text-white">
                  Blog
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full">
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
              alt="City Lights"
              className="w-full h-[800px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/50 p-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Explore the Urban Jungle
              </h2>
              <p className="text-lg md:text-xl mb-6">
                A collection of stunning cityscapes capturing modern life.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 transition rounded-md text-white">
                  Submit Photo
                </button>
                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 transition rounded-md text-white">
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
