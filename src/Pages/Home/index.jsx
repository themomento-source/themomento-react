import React from "react";
import HomeSlider from "../../components/HomeSlider";

import HomeImageGallery from "../../components/HomeImageGallery";
// import HomeBlogSection from "../../components/HomeBlogSection";

import PhotoOfTheDay from "../../components/PhotoOfTheDay";
import LatestBlogs from "../../components/LatestBlogs"; // Import the new component
import PhotoListing from "../PhotoListing";

// import MembershipPromo from "../../components/PromotionCreateGallerry";
// import EventsSection from "../../components/EventSectionHomepage";

function Home() {
  return (
    <>
      <HomeSlider />

      {/* <HomeCatSlider /> */}
      <PhotoOfTheDay />
      <LatestBlogs /> {/* Use the new component */}
      <PhotoListing/>
    </>
  );
}

export default Home;