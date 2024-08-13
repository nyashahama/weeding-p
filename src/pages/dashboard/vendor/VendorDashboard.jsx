import React, { useState, useEffect } from "react";
import ManageBooking from "./ManageBooking";
import ServicesManagement from "./ServicesManagement";
import ProfileManagement from "./ProfileManagement";
import Calendar from "./Calendar";
import Home from "./Home";

export default function VendorDashboard() {
  const [activeLink, setActiveLink] = useState("Home");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUsername(JSON.parse(user).full_name);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  let content = null;

  switch (activeLink) {
    case "Home":
      content = <Home />;
      break;
    case "ManageBooking":
      content = <ManageBooking />;
      break;
    case "Calendar":
      content = <Calendar />;
      break;
    case "ServicesManagement":
      content = <ServicesManagement />;
      break;
    case "ProfileManagement":
      content = <ProfileManagement />;
      break;
    default:
      content = <Home />;
  }

  return (
    <div className="flex bg-gray-100">
      <aside className="h-screen bg-white fixed lg:sticky top-0 border-r-2 p-6 pt-10 whitespace-nowrap z-10 closed shadow-xl ">
        <div className="mb-10 flex items-center justify-between">
          <div className="p-2 text-white border-b-2 rounded">
            <img src="../../../../logo.jpg" alt="Logo" className="h-20" />
          </div>
          <button className="lg:hidden bg-gray-200 text-gray-500 rounded leading-none p-1 btn-close-menu">
            <i data-feather="chevron-left"></i>
          </button>
        </div>

        <ul className="text-gray-500 font-semibold flex flex-col gap-2">
          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("Home")}
              className={`flex items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all ${
                activeLink === "Home" ? "text-black bg-gray-100" : ""
              }`}
            >
              <i className="fa fa-home mr-3"></i>
              <span className="flex-grow">Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("Calendar")}
              className={`flex items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all ${
                activeLink === "Calendar" ? "text-black bg-gray-100" : ""
              }`}
            >
              <i className="fa fa-calendar mr-3"></i>
              <span className="flex-grow">Your Calendar</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("ManageBooking")}
              className={`flex items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all ${
                activeLink === "ManageBooking" ? "text-black bg-gray-100" : ""
              }`}
            >
              <i className="fa fa-columns mr-3"></i>
              <span className="flex-grow">Manage Booking</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("ServicesManagement")}
              className={`flex items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all ${
                activeLink === "ServicesManagement"
                  ? "text-black bg-gray-100"
                  : ""
              }`}
            >
              <span className="flex items-center gap-3">
                <i className="fa fa-bell"></i>
                Services Management
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("ProfileManagement")}
              className={`flex items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all ${
                activeLink === "ProfileManagement"
                  ? "text-black bg-gray-100"
                  : ""
              }`}
            >
              <span className="flex items-center gap-3">
                <i className="fa fa-rss"></i>
                Profile Management
              </span>
            </a>
          </li>
          <li className="border my-2"></li>
          <li>
            <a
              href="#"
              onClick={logout}
              className="flex items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all"
            >
              <i className="fa fa-user mr-3"></i>
              <span className="flex-grow">Logout</span>
              <i className="fa fa-chevron-down"></i>
            </a>
          </li>
        </ul>
      </aside>

      <div className="w-full">
        <header className="px-6 lg:px-8 pb-4 lg:pb-6 pt-6 lg:pt-10 shadow bg-white mb-1 sticky top-0 flex justify-between items-center">
          <div>
            <p className="text-2xl font-extrabold text-gray-400">
              Butterfly Weddings
            </p>
          </div>

          <div className="flex items-center">
            <span className="mr-4 text-gray-700 dark:text-gray-300">
              {username || "Username"}
            </span>

            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </header>

        <main className="px-6 py-8 lg:px-8 bg-gray-100 flex flex-col gap-6 z-20">
          {content}
        </main>
      </div>
    </div>
  );
}
