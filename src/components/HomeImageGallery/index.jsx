import React from "react";
import ImageCard from "../ImageCard";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

function HomeImageGallery() {
  return (
    <div className="my-10 bg-gray flex flex-col justify-center items-center">
      <h2 className="font-semibold text-[25px] px-10">Photos</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {/* Image 1 */}
        <ImageCard
          img="https://images.pexels.com/photos/30230301/pexels-photo-30230301/free-photo-of-silhouette-woman-standing-by-window-in-dark-room.jpeg"
          title="Hell"
          author="Farhana"
          price={10}
          icon1={
            <BsCartFill className="text-2xl cursor-pointer hover:scale-110" />
          }
          icon2={
            <FaRegHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110" />
          }
        />

        <ImageCard
          img="https://images.pexels.com/photos/17642974/pexels-photo-17642974/free-photo-of-brunette-woman-standing-on-a-lawn-wearing-a-black-bandeau-dress.jpeg"
          title="Women"
          author="Arin"
          price={12}
          icon1={
            <BsCartFill className="text-2xl cursor-pointer hover:scale-110" />
          }
          icon2={
            <FaRegHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110" />
          }
        />

        <ImageCard
          img="https://images.pexels.com/photos/28770936/pexels-photo-28770936/free-photo-of-ancient-petroglyphs-on-rocky-cliffside.jpeg"
          title="Men"
          author="Abir"
          price={13}
          icon1={
            <BsCartFill className="text-2xl cursor-pointer hover:scale-110" />
          }
          icon2={
            <FaRegHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110" />
          }
        />

        <ImageCard
          img="https://images.pexels.com/photos/28770935/pexels-photo-28770935/free-photo-of-explorer-amidst-ancient-rock-formations.jpeg"
          title="Mountain"
          author="Arin"
          price={9}
          icon1={
            <BsCartFill className="text-2xl cursor-pointer hover:scale-110" />
          }
          icon2={
            <FaRegHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110" />
          }
        />

        <ImageCard
          img="https://images.pexels.com/photos/28651876/pexels-photo-28651876/free-photo-of-modern-architectural-marvel-against-clear-sky.jpeg"
          title="Architecture"
          author="Rahat"
          price={7}
          icon1={
            <BsCartFill className="text-2xl cursor-pointer hover:scale-110" />
          }
          icon2={
            <FaRegHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110" />
          }
        />

        <ImageCard
          img="https://images.pexels.com/photos/17516413/pexels-photo-17516413/free-photo-of-coffee-beans-are-shown-in-this-image.jpeg"
          title="Coffe"
          author="Arin"
          price={13}
          icon1={
            <BsCartFill className="text-2xl cursor-pointer hover:scale-110" />
          }
          icon2={
            <FaRegHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110" />
          }
        />

        <ImageCard
          img="https://images.pexels.com/photos/18355489/pexels-photo-18355489/free-photo-of-woman-in-a-black-dress-standing-in-front-of-a-window.jpeg"
          title="Women"
          author="Arin"
          price={12}
          icon1={
            <BsCartFill className="text-2xl cursor-pointer hover:scale-110" />
          }
          icon2={
            <FaRegHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110" />
          }
        />

        <ImageCard
          img="https://images.pexels.com/photos/30110564/pexels-photo-30110564/free-photo-of-ornate-classical-architecture-with-golden-accents.jpeg"
          title="Architecture"
          author="Jackie"
          price={28}
          icon1={
            <BsCartFill className="text-2xl cursor-pointer hover:scale-110" />
          }
          icon2={
            <FaRegHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110" />
          }
        />

        <ImageCard
          img="https://images.pexels.com/photos/30260829/pexels-photo-30260829/free-photo-of-stylish-woman-relaxing-on-a-modern-sofa.jpeg"
          title="Women"
          author="Redwan"
          price={17}
          icon1={
            <BsCartFill className="text-2xl cursor-pointer hover:scale-110" />
          }
          icon2={
            <FaRegHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110" />
          }
        />
      </div>
    </div>
  );
}

export default HomeImageGallery;
