import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const initialBookings = [
  {
    date: "23 Feb",
    event: "DJ Music Event",
    title: "Live in Sydney",
    calendar: "Wednesday, 28 December 2014 08:55 PM to 12:00 AM",
    location: "Nexen Square, Sydney, Australia",
    status: "Booked",
    bookingStatus: "Confirmed",
  },
  {
    date: "23 Feb",
    event: "Live Performance",
    title: "Corner Obsest Program",
    calendar: "Wednesday, 28 December 2014 08:55 PM to 12:00 AM",
    location: "Nexen Square, Sydney, Australia",
    status: "Booked", // Existing status field
    bookingStatus: "Pending", // New status field
  },
  {
    date: "23 Feb",
    event: "DJ Music Event",
    title: "Music Kaboom Festival",
    calendar: "Wednesday, 28 December 2014 08:55 PM to 12:00 AM",
    location: "Nexen Square, Sydney, Australia",
    status: "Booked", // Existing status field
    bookingStatus: "Confirmed", // New status field
  },
  {
    date: "23 Feb",
    event: "DJ Music Event",
    title: "Hello Dubai Festival",
    calendar: "Wednesday, 28 December 2014 08:55 PM to 12:00 AM",
    location: "Nexen Square, Sydney, Australia",
    status: "Cancelled", // Existing status field
    bookingStatus: "Cancelled", // New status field
  },
  {
    date: "23 Feb",
    event: "DJ Music Event",
    title: "Music Kaboom Festival",
    calendar: "Wednesday, 28 December 2014 08:55 PM to 12:00 AM",
    location: "Nexen Square, Sydney, Australia",
    status: "Booked",
    bookingStatus: "Pending",
  },
  {
    date: "23 Feb",
    event: "DJ Music Event",
    title: "Hello Dubai Festival",
    calendar: "Wednesday, 28 December 2014 08:55 PM to 12:00 AM",
    location: "Nexen Square, Sydney, Australia",
    status: "Cancelled",
    bookingStatus: "Cancelled",
  },
];

export default function ManageBooking() {
  const [bookings, setBookings] = useState(initialBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const bookingsPerPage = 4;

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelBooking = (index) => {
    const updatedBookings = bookings.map((booking, i) =>
      i === index
        ? { ...booking, bookingStatus: "Cancelled", status: "Cancelled" }
        : booking
    );
    setBookings(updatedBookings);
  };

  return (
    <div className="p-4 shadow-inner rounded">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or event..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-xs rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {currentBookings.map((booking, index) => (
          <div
            key={index}
            className="rounded-lg border shadow-inner border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4 text-2xl font-semibold text-blue-600">
                {booking.date.split(" ")[0]}
              </div>
              <div className="text-2xl text-blue-800">
                {booking.date.split(" ")[1]}
              </div>
            </div>

            <div>
              <div className="flex items-center text-gray-700 mb-2">
                <i className="fa fa-music mr-2 text-blue-600"></i>
                <p className="text-lg font-semibold">{booking.event}</p>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <i className="fa fa-calendar-alt mr-2 text-gray-500"></i>
                <h2 className="text-lg font-bold">{booking.title}</h2>
              </div>

              <div className="flex items-center text-blue-700 mb-4">
                <i className="fa fa-map-marker-alt mr-2 text-blue-500"></i>
                <p className="text-sm">{booking.location}</p>
              </div>
              <div
                className={`flex items-center justify-between py-2 px-4 rounded-md text-sm font-medium ${getStatusClass(
                  booking.bookingStatus
                )} transition-transform duration-300 ease-in-out transform hover:scale-105`}
              >
                <p className="flex items-center">
                  <i
                    className={`fa fa-tag mr-2 ${
                      getStatusClass(booking.bookingStatus).split(" ")[1]
                    }`}
                  ></i>
                  {booking.bookingStatus}
                </p>
                {booking.bookingStatus !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelBooking(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
              <a
                href="#"
                className="flex items-center mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm mt-2"
              >
                <i className="fa fa-ticket-alt mr-2"></i>
                {booking.status}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={
            <span className="text-gray-700 text-xs">
              <i className="fas fa-chevron-left mr-2"></i>
              prev
            </span>
          }
          nextLabel={
            <span className="text-gray-700 text-xs">
              next
              <i className="fas fa-chevron-right ml-2"></i>
            </span>
          }
          breakLabel={<span className="text-gray-500">...</span>}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center space-x-2"
          pageClassName="page-item"
          pageLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          previousClassName="page-item"
          previousLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          nextClassName="page-item"
          nextLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          breakClassName="page-item"
          breakLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          activeClassName="text-white border-blue-500"
        />
      </div>
    </div>
  );
}
