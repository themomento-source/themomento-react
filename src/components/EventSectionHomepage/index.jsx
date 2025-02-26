import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api"; 
const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from the backend API
    const fetchEvents = async () => {
      try {
        // Fetch events from the API
        const response = await fetchDataFromApi("/api/event"); 

        // Check if the response is successful and contains events
        if (response.success && response.events) {
          // Map the API response to match the expected structure
          const formattedEvents = response.events.map((event) => ({
            id: event._id, // Use MongoDB _id as the unique identifier
            title: event.title,
            date: new Date(event.eventDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }), 
            location: event.location,
            image: event.imageUrl,
            externalLink: "", 
          }));
          setEvents(formattedEvents);
        } else {
          console.error("Error fetching events: Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
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
      ) : events.length > 0 ? (
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
      ) : (
        <p className="text-center text-gray-300">No events found.</p>
      )}
    </div>
  );
};

export default EventsSection;