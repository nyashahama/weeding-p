import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/tailwind.css";
import axios from "axios";

const ServiceModal = ({ show, onHide, service }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [data, setData] = useState({
    serviceId: "",
    subcategoryName: "",
    userId: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { name, email, phone, message } = formData;
    if (!name || !email || !phone || !message) {
      toast.error("All fields are required.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid phone number (10 digits).");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.error("User not found in local storage");
      return;
    }

    const userId = user.id;
    setFormData({
      ...formData,
      userId,
    });

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:4000/addrequest",
        formData
      );

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      toast.success("Form submitted successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleBookNow = async (serviceId, subcategoryName) => {
    // Retrieve the user ID from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      throw new Error("User not found in local storage");
    }

    const userId = user.id;

    if (!userId) {
      console.error("User ID is not available in local storage");
      return;
    }

    // Create the form data object
    const Data = {
      serviceId,
      subcategoryName,
      userId,
    };

    //add booking
    // const response = await axios.post("http://localhost:4000/addbooking", data);

    toast.success("Booking submitted successfully");

    setData({
      serviceId: "",
      subcategoryName: "",
      userId: "",
    });
  };

  if (!service) return null;

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
      return `../../../../../bookings/${randomImage})`;
    }
  };

  return (
    <Modal show={show} size="xl" onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{service.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="shadow-inner p-4 bg-gray-200">
        <div className="mb-4">
          <img
            src={getRandomImage(service.title)}
            alt={service.title}
            className="w-full h-64 object-cover mb-4"
          />

          <p>{service.description}</p>
        </div>
        {service.subcategories && (
          <div className="row">
            {service.subcategories.map((subcategory) => (
              <div key={subcategory.name} className="col-md-6 mb-4">
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={getRandomImage(subcategory.name)}
                    className="w-full h-48 object-cover"
                    alt={subcategory.name}
                  />
                  <Card.Body>
                    <Card.Title>{subcategory.name}</Card.Title>
                    <Card.Text>{subcategory.shortDescription}</Card.Text>
                    <Card.Text className="font-weight-bold">
                      R{subcategory.price}
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="mt-2 text-xs"
                      onClick={() =>
                        handleBookNow(service.id, subcategory.name)
                      }
                    >
                      <i className="fas fa-calendar-check mr-2"></i>
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
        <div className="">
          {isFormVisible ? (
            <>
              <h4 className="mb-2 text-2xl text-gray-400 tracking-wide font-bold mb-3">
                Describe Your Needs
              </h4>
              <Form
                onSubmit={handleSubmit}
                className="shadow-inner p-3 rounded"
              >
                <Form.Group controlId="formName" className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPhone" className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formMessage" className="mb-2">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="text-xs mt-2"
                  type="submit"
                >
                  <i className="fas fa-check mr-2"></i>
                  Submit
                </Button>
                <Button
                  variant="secondary"
                  className="text-xs ml-2 mt-2"
                  onClick={toggleFormVisibility}
                >
                  <i className="fas fa-times mr-2"></i>
                  Close Form
                </Button>
              </Form>
            </>
          ) : (
            <Button variant="secondary" onClick={toggleFormVisibility}>
              <i className="fas fa-question-circle mr-2"></i>
              Can't find what you are looking for? Describe your needs
            </Button>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="text-xs " onClick={onHide}>
          <i className="fas fa-times mr-2"></i> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceModal;
