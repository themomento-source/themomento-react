import React from "react";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineDownload } from "react-icons/md";

const photo = {
  id: 1,
  img: "https://images.pexels.com/photos/29469384/pexels-photo-29469384/free-photo-of-women-in-traditional-dresses-amidst-vibrant-lotus-field.jpeg",
  title: "Lotus Field Beauty",
  author: "John Doe",
  authorImg: "https://source.unsplash.com/100x100/?person",
  price: 120,
  resolution: "6000 x 4000 px",
  category: "Nature & Landscapes",
  license: "Royalty Free",
  tags: ["Nature", "Lotus", "Photography", "Flowers"],
};

const relatedPhotos = [
  {
    id: 2,
    img: "https://source.unsplash.com/600x400/?landscape",
  },
  {
    id: 3,
    img: "https://source.unsplash.com/600x400/?city",
  },
  {
    id: 4,
    img: "https://source.unsplash.com/600x400/?ocean",
  },
  {
    id: 5,
    img: "https://source.unsplash.com/600x400/?mountain",
  },
];

function PhotoDetails() {
  return (
    <section className="py-12 bg-gray-100">
      {/* Container */}
      <div className="container mx-auto px-6 lg:px-12">

        {/* Image Display */}
        <div className="w-full flex flex-col lg:flex-row gap-8">
          {/* Large Image */}
          <div className="w-full lg:w-[65%]">
            <img
              src={photo.img}
              alt={photo.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Photo Details */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            {/* Photographer Info */}
            <div className="flex items-center gap-4">
              <img
                src={photo.authorImg}
                alt={photo.author}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-lg font-semibold">{photo.author}</p>
                <p className="text-gray-500">Photographer</p>
              </div>
            </div>

            {/* Photo Title */}
            <h2 className="text-3xl font-bold">{photo.title}</h2>

            {/* Pricing & Buttons */}
            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold text-gray-800">${photo.price}</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">
                <BsCartFill />
                Add to Cart
              </button>
              <button className="bg-gray-800 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-gray-900 transition">
                <MdOutlineDownload />
                Buy Now
              </button>
            </div>

            {/* Photo Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p><strong>Resolution:</strong> {photo.resolution}</p>
              <p><strong>Category:</strong> {photo.category}</p>
              <p><strong>License:</strong> {photo.license}</p>
              <p><strong>Tags:</strong> {photo.tags.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Related Photos Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Related Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedPhotos.map((photo) => (
              <img
                key={photo.id}
                src={photo.img}
                alt="Related"
                className="w-full rounded-lg shadow-md hover:opacity-80 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhotoDetails;
