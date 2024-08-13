import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ServiceModal from "./partials/ServiceModal";
import axios from "axios";

export default function Exploreservices() {
  const [services, setServicesWithSubcategories] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const itemsPerPage = 2;

  // Filter services based on search term
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate services
  const pageCount = Math.ceil(filteredServices.length / itemsPerPage);
  const displayedServices = filteredServices.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          throw new Error("User not found in local storage");
        }

        const userId = user.id;

        const response = await axios.get(`http://localhost:4000/services`);
        setServicesWithSubcategories(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchServices();
  }, []);

  const images = {
    dj: ["Dj.jpg", "dj1.jpg", "dj2.jpg", "dj3.jpg"],
    cake: ["Cake.jpg", "cake1.jpg", "cake+2.jpg"],
    flowers: ["flowers.jpg", "Flowes.jpg", "Flowe.jpg"],
  };

  const getRandomImage = (title) => {
    const category = Object.keys(images).find((cat) =>
      title.toLowerCase().includes(cat)
    );

    if (category && images[category]) {
      const imageList = images[category];
      const randomImage =
        imageList[Math.floor(Math.random() * imageList.length)];
      return `url('../../../../../bookings/${randomImage}')`;
    }

    return `url('../../../../../booking/default.jpg')`;
  };

  return (
    <div className="p-4 shadow-inner border rounded">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search services..."
          className="p-2 rounded w-full text-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ol className="relative">
        {displayedServices.map((service) => (
          <li
            key={service.id}
            className="mb-10 relative"
            onClick={() => handleServiceClick(service)}
          >
            <div
              className="p-4 rounded-lg h-40 bg-gradient-to-r from-gray-100 to-gray-100 border-l-4 border-gray-200 relative"
              style={{
                cursor: "pointer",
                backgroundImage: getRandomImage(service.title),
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 p-4 rounded-lg">
                <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                <p className="text-lg">{service.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

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
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center items-center space-x-2"
        pageClassName="page-item"
        pageLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
        previousClassName="page-item"
        previousLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
        nextClassName="page-item "
        nextLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
        breakClassName="page-item"
        breakLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
        activeClassName=" text-white border-blue-500"
      />

      <ServiceModal
        show={showModal}
        onHide={handleCloseModal}
        service={selectedService}
      />
    </div>
  );
}
