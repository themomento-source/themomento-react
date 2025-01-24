import React from "react";
import ImageCard from "../../components/ImageCard";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

const images = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/29469384/pexels-photo-29469384/free-photo-of-women-in-traditional-dresses-amidst-vibrant-lotus-field.jpeg",
    title: "Lotus Field Beauty",
    author: "John Doe",
    price: 120,
  },
  {
    id: 2,
    img: "https://source.unsplash.com/800x600/?landscape",
    title: "Majestic Mountains",
    author: "Jane Smith",
    price: 90,
  },
  {
    id: 3,
    img: "https://source.unsplash.com/800x600/?city",
    title: "City Lights",
    author: "Alex Johnson",
    price: 250,
  },
  {
    id: 4,
    img: "https://source.unsplash.com/800x600/?ocean",
    title: "Ocean Sunset",
    author: "Michael Lee",
    price: 150,
  },
];

function PhotoListing() {
  return (
    <section className="py-12 bg-gray-100">
      {/* Page Header */}
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Explore Our Collection</h2>
        <p className="text-gray-600 mt-2">Discover and buy high-quality stock photos</p>
      </div>

      {/* Image Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((item) => (
            <ImageCard
              key={item.id}
              id={item.id}
              img={item.img}
              title={item.title}
              author={item.author}
              price={item.price}
              icon1={<BsCartFill className="text-white text-2xl cursor-pointer hover:text-gray-300" />}
              icon2={<FaRegHeart className="text-white text-2xl cursor-pointer hover:text-red-500" />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhotoListing;
