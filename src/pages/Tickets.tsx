import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
}

const Tickets: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const headerRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLUListElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://louvre-backend-production.up.railway.app/events"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50, duration: 1 },
      { opacity: 1, y: 0 }
    );
    gsap.fromTo(
      eventsRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
      }
    );
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8 }
    );
  }, []);

  // Book a ticket
  const handleBookTicket = async () => {
    if (!selectedEvent || !userName || !email) {
      setMessage("Please fill in all fields and select an event.");
      return;
    }
    try {
      const response = await axios.post(
        "https://louvre-backend-production.up.railway.app/book-ticket",
        {
          eventId: selectedEvent,
          userName,
          email,
        }
      );
      setMessage(`Ticket booked successfully! Ticket ID: ${response.data.id}`);
    } catch (error) {
      console.error("Error booking ticket:", error);
      setMessage("Could not book ticket. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div
        ref={headerRef}
        className="relative w-full h-[66vh] md:h-[50vh] flex items-center justify-center"
      >
        <img
          src="/assets/pyramide.jpeg"
          alt="Event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Book a Ticket</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Events List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Events</h2>
          <ul
            ref={eventsRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {events.map((event) => (
              <li
                key={event.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedEvent === event.id
                    ? "border-blue-500"
                    : "border-gray-700"
                } hover:border-blue-400 transition`}
                onClick={() => setSelectedEvent(event.id)}
              >
                <h3 className="font-bold text-lg">{event.name}</h3>
                <p className="text-sm text-gray-400">{event.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Booking Form */}
        <div ref={formRef}>
          <h2 className="text-2xl font-bold mb-4">Book Your Ticket</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleBookTicket}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Book Ticket
            </button>
          </div>
          {message && (
            <p className="mt-4 text-center text-lg text-green-400">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
