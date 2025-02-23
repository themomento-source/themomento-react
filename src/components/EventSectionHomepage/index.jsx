import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchEvents = async () => {
      try {
        // Placeholder events data
        const placeholderEvents = [
          {
            id: 1,
            title: "Nature Photography Workshop",
            date: "October 15, 2023",
            location: "New York, USA",
            image:
              "https://cdn.prod.website-files.com/5f7a5e204f25f20dc72567dc/60146de21a756d80e2bb41dc_sell-p-1080.jpeg",
            externalLink: "https://example.com/nature-workshop",
          },
          {
            id: 2,
            title: "Street Photography Masterclass",
            date: "November 5, 2023",
            location: "London, UK",
            image:
              "https://img.freepik.com/free-vector/party-poster_53876-91555.jpg?t=st=1740273167~exp=1740276767~hmac=177accefa0c36b5e053705c416327f7a5a235d80c2b79794278b3ad6418e7415&w=740",
            externalLink: "",
          },
          {
            id: 3,
            title: "Portrait Photography Seminar",
            date: "December 10, 2023",
            location: "Paris, France",
            image:
              "https://img.freepik.com/free-vector/elegant-event-party-banner-with-black-splash_1361-2171.jpg?t=st=1740273283~exp=1740276883~hmac=7c0c6ca54867e8dab4455f661af5509d25dcb841005769b10c4657dfdf475f2e&w=996",
            externalLink: "https://example.com/portrait-seminar",
          },
          {
            id: 4,
            title: "Wildlife Photography Expedition",
            date: "January 20, 2024",
            location: "Nairobi, Kenya",
            image:
              "https://img.freepik.com/premium-photo/rear-view-audience-speakers-stage-conference-hall-seminar-meeting-business-education-concept_386094-4.jpg?w=1060",
            externalLink: "https://example.com/wildlife-expedition",
          },
          {
            id: 5,
            title: "Urban Photography Tour",
            date: "February 12, 2024",
            location: "Tokyo, Japan",
            image:
              "https://img.freepik.com/free-vector/music-event-poster-template-with-abstract-shapes_1361-1316.jpg?t=st=1740273402~exp=1740277002~hmac=178d23b2018409db96a9b4cdac11aa162b5694db713ca86c546d35320d97d3d2&w=1060",
            externalLink: "",
          },
          {
            id: 6,
            title: "Landscape Photography Retreat",
            date: "March 8, 2024",
            location: "Reykjavik, Iceland",
            image:
              "https://img.freepik.com/free-vector/music-event-banner-template-with-photo_52683-12627.jpg?t=st=1740273429~exp=1740277029~hmac=c13f13c9420f9772f64c3ef8235ea5aeff3e0d1add8af5f24a9fa1aa49476642&w=1060",
            externalLink: "https://example.com/landscape-retreat",
          },
        ];

        // Simulate API delay
        setTimeout(() => {
          setEvents(placeholderEvents);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-black py-16 px-4 md:px-8">
      {/* Import Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=PT+Serif&display=swap"
        rel="stylesheet"
      />

      {/* Title and Subtitle */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-marcellus">
          Upcoming Photography Events
        </h2>
        <p className="text-gray-300 text-lg md:text-xl font-pt-serif">
          Join us for exciting photography events and workshops around the world.
        </p>
      </div>

      {/* Event Cards Grid */}
      {loading ? (
        <p className="text-center text-gray-300">Loading events...</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link
              key={event.id}
              to={event.externalLink || `/events/${event.id}`}
              target={event.externalLink ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="block bg-black hover:opacity-80 transition-opacity duration-300"
            >
              {/* Event Image */}
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 font-marcellus">
                  {event.title}
                </h3>
                <p className="text-gray-300 text-sm mb-2 font-pt-serif">
                  <span className="font-semibold">Date:</span> {event.date}
                </p>
                <p className="text-gray-300 text-sm mb-4 font-pt-serif">
                  <span className="font-semibold">Location:</span> {event.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsSection;