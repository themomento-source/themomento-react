import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

function HomeCatSlider() {
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get("/api/slider?published=true");
        setSliderImages(response.data.data);
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };

    fetchSliderImages();
  }, []);
  return (
    <div className="homeCatSlider">
      <div className="container">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link to="/">
              <div className="relative w-full hover:scale-105 transition-all">
                <img
                  src="https://images.pexels.com/photos/30227319/pexels-photo-30227319/free-photo-of-serene-view-of-mount-fuji-at-dusk.jpeg"
                  className="w-full rounded-sm"
                  alt="Mountain"
                />
                {/* Smaller text size */}
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-[16px] md:text-[20px] font-semibold tracking-wide drop-shadow-lg bg-gradient-to-r from-black/50 to-black/30 p-2 rounded-md">
                  Mountain
                </h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/">
              <div className="relative w-full hover:scale-105 transition-all">
                <img
                  src="https://images.pexels.com/photos/30227319/pexels-photo-30227319/free-photo-of-serene-view-of-mount-fuji-at-dusk.jpeg"
                  className="w-full rounded-sm"
                  alt="Mountain"
                />
                {/* Smaller text size */}
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-[16px] md:text-[20px] font-semibold tracking-wide drop-shadow-lg bg-gradient-to-r from-black/50 to-black/30 p-2 rounded-md">
                  Mountain
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="relative w-full hover:scale-105 transition-all">
                <img
                  src="https://images.pexels.com/photos/30227319/pexels-photo-30227319/free-photo-of-serene-view-of-mount-fuji-at-dusk.jpeg"
                  className="w-full rounded-sm"
                  alt="Mountain"
                />
                {/* Smaller text size */}
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-[16px] md:text-[20px] font-semibold tracking-wide drop-shadow-lg bg-gradient-to-r from-black/50 to-black/30 p-2 rounded-md">
                  Mountain
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="relative w-full hover:scale-105 transition-all">
                <img
                  src="https://images.pexels.com/photos/30227319/pexels-photo-30227319/free-photo-of-serene-view-of-mount-fuji-at-dusk.jpeg"
                  className="w-full rounded-sm"
                  alt="Mountain"
                />
                {/* Smaller text size */}
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-[16px] md:text-[20px] font-semibold tracking-wide drop-shadow-lg bg-gradient-to-r from-black/50 to-black/30 p-2 rounded-md">
                  Mountain
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="relative w-full hover:scale-105 transition-all">
                <img
                  src="https://images.pexels.com/photos/30227319/pexels-photo-30227319/free-photo-of-serene-view-of-mount-fuji-at-dusk.jpeg"
                  className="w-full rounded-sm"
                  alt="Mountain"
                />
                {/* Smaller text size */}
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-[16px] md:text-[20px] font-semibold tracking-wide drop-shadow-lg bg-gradient-to-r from-black/50 to-black/30 p-2 rounded-md">
                  Mountain
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="relative w-full hover:scale-105 transition-all">
                <img
                  src="https://images.pexels.com/photos/30227319/pexels-photo-30227319/free-photo-of-serene-view-of-mount-fuji-at-dusk.jpeg"
                  className="w-full rounded-sm"
                  alt="Mountain"
                />
                {/* Smaller text size */}
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-[16px] md:text-[20px] font-semibold tracking-wide drop-shadow-lg bg-gradient-to-r from-black/50 to-black/30 p-2 rounded-md">
                  Mountain
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="relative w-full hover:scale-105 transition-all">
                <img
                  src="https://images.pexels.com/photos/30227319/pexels-photo-30227319/free-photo-of-serene-view-of-mount-fuji-at-dusk.jpeg"
                  className="w-full rounded-sm"
                  alt="Mountain"
                />
                {/* Smaller text size */}
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-[16px] md:text-[20px] font-semibold tracking-wide drop-shadow-lg bg-gradient-to-r from-black/50 to-black/30 p-2 rounded-md">
                  Mountain
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="relative w-full hover:scale-105 transition-all">
                <img
                  src="https://images.pexels.com/photos/30227319/pexels-photo-30227319/free-photo-of-serene-view-of-mount-fuji-at-dusk.jpeg"
                  className="w-full rounded-sm"
                  alt="Mountain"
                />
                {/* Smaller text size */}
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-[16px] md:text-[20px] font-semibold tracking-wide drop-shadow-lg bg-gradient-to-r from-black/50 to-black/30 p-2 rounded-md">
                  Mountain
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HomeCatSlider;
