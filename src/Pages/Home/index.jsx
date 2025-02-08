import React from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import HomeImageGallery from "../../components/HomeImageGallery";
import HomeBlogSection from "../../components/HomeBlogSection";
import Footer from "../../components/Footer";

function Home() {
  return (
    <>
      <HomeSlider />
      <br />
      {/* <HomeCatSlider /> */}

      <HomeImageGallery />

      <HomeBlogSection />

      <br />
      <br />
    </>
  );
}

export default Home;
