import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AddNewService() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      subcategories: [{ name: "", price: "", shortDescription: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategories",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Create form data
      const formData = new FormData();

      // Append simple fields and subcategories
      Object.keys(data).forEach((key) => {
        if (key === "subcategories") {
          formData.append("subcategories", JSON.stringify(data.subcategories));
        } else {
          formData.append(key, data[key]);
        }
      });

      // Add user info if available
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        formData.append("userId", user.id);
        formData.append("userEmail", user.email);
      }

      // Convert FormData to object for logging and debugging
      const formDataObject = formDataToObject(formData);
      console.log(formDataObject);

      try {
        const response = await axios.post(
          "http://localhost:4000/addservice",
          formDataObject // Send FormData directly without conversion
        );

        if (response.status === 201) {
          toast.success("Service added successfully!");
          reset();
        } else {
          toast.error("Failed to add service. Please try again.");
        }
      } catch (error) {
        console.error(
          "Error details:",
          error.response || error.message || error
        );

        toast.error(
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "Failed to add service. Please try again."
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Failed to process form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to convert FormData to an object (for debugging purposes)
  const formDataToObject = (formData) => {
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  return (
    <div className="p-4 shadow-inner border rounded">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
        <div className="mb-3">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Service Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Service title is required" })}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter the title of the service"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            {...register("description", {
              required: "Description is required",
            })}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Provide a detailed description of the service"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        {fields.map((item, index) => (
          <div key={item.id} className="mb-3">
            <h3 className="text-2xl mb-2 tracking-wide font-bold text-gray-500">
              Subcategory {index + 1}
            </h3>
            <button
              type="button"
              onClick={() => remove(index)}
              className="mb-4 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2"
            >
              <i className="fas fa-trash mr-2 fa-xs"></i>
              Remove
            </button>
            <div className="mb-3">
              <label
                htmlFor={`subcategories[${index}].name`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Subcategory Name
              </label>
              <input
                type="text"
                id={`subcategories[${index}].name`}
                {...register(`subcategories.${index}.name`)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter subcategory name"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor={`subcategories[${index}].price`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                id={`subcategories[${index}].price`}
                {...register(`subcategories.${index}.price`)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter price"
                step="0.01"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor={`subcategories[${index}].shortDescription`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Short Description
              </label>
              <textarea
                id={`subcategories[${index}].shortDescription`}
                rows="2"
                {...register(`subcategories.${index}.shortDescription`)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter short description"
              ></textarea>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: "", price: "", shortDescription: "" })}
          className="mb-4 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Subcategory
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? "Saving..." : "Save Service"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
