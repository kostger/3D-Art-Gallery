import React from "react";

function Visit() {
  return (
    <div className="relative ">
      {/* Background Image Section */}
      <div className="relative h-[66vh] md:h-[50vh]">
        <img
          src="/assets/la-grande-galerie.jpg"
          alt="La Grande Galerie"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 p-10 flex flex-col items-center justify-center md:items-start text-white bg-black bg-opacity-40">
          <h1 className="text-2xl md:text-4xl lg:text-6xl">VISIT</h1>
          <p className="mt-2 text-lg md:text-xl lg:text-2xl">
            Everything you need to know before visiting the museum
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 p-6 font-sans">
        {/* Hours & Admission Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-blue-700 uppercase">
            Hours & Admission
          </h2>
          <p className="mt-2 text-lg">
            The museum is open daily except Tuesdays. Last entry 1 hour before
            closure. Visitors will be asked to vacate the exhibition rooms 30
            minutes before closure.
          </p>
          <div className="mt-4 p-4 border rounded-md bg-white shadow">
            <h3 className="text-lg font-semibold uppercase">
              The Musée du Louvre
            </h3>
            <div className="mt-2 flex items-center">
              <span className="h-4 w-4 rounded-full bg-green-500"></span>
              <span className="ml-2 text-sm">
                The museum is open today from{" "}
                <strong>9:00 AM to 6:00 PM</strong>.
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex justify-between">
                <span className="text-sm">
                  Monday, Thursday, Saturday and Sunday
                </span>
                <span className="font-semibold">9:00 AM → 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">Wednesday and Friday</span>
                <span className="font-semibold">9:00 AM → 9:00 PM</span>
              </li>
            </ul>
            <div className="mt-2 text-center">
              <span className="text-sm font-semibold uppercase text-red-600">
                Closed: Tuesday
              </span>
            </div>
          </div>
          <a
            href="#"
            className="mt-4 block text-blue-600 hover:underline text-sm"
          >
            See opening hours of museum and gardens →
          </a>
        </div>

        {/* Ticket Prices Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-blue-700 uppercase">
            Ticket Prices
          </h2>
          <p className="mt-2 text-lg">
            Tickets can be used to access both the permanent collections and
            temporary exhibitions. Time-slot bookings are recommended, including
            for free-admission visitors.
          </p>
          <a
            href="#"
            className="mt-2 block text-blue-600 hover:underline text-sm"
          >
            See full list of visitors eligible for free admission, and
            conditions →
          </a>
          <div className="mt-4 p-4 border rounded-md bg-white shadow md:flex md:justify-between">
            {/* Ticket Pricing Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">General Admission</h3>
                <p className="mt-1 text-gray-500">€22.00</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Under 18 years old, under 26-year-old residents of the EEA
                </h3>
                <a
                  href="#"
                  className="mt-1 text-blue-600 hover:underline text-sm block"
                >
                  See full list of visitors eligible for free admission →
                </a>
                <p className="text-gray-500">FREE</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Guided tours, storytime, and workshops
                </h3>
                <p className="mt-1 text-gray-500">€9.00 to €12.00</p>
                <p className="text-sm text-gray-400">
                  This price does not include admission to the museum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visit;
