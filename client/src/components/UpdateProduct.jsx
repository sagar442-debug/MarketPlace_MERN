import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
const UpdateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [altImages, setAltImages] = useState("");
  const [size, setSize] = useState("");

  const handleImgUrl = (e) => {
    setImgUrl(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitted");
  };

  return (
    <div className=" ">
      <div className="bg-black min-h-[100vh] min-w-[99vw] absolute -top-[4rem] -left-[45rem] opacity-65"></div>
      <form
        onSubmit={handleSubmit}
        className="bg-white absolute w-96 left-[37%] z-10 shadow-[0_30px_30px_0px_rgba(0,0,0,0.5)] border-[1px] rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full border-gray-300 border p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            rows="4"
            className="w-full border-gray-300 border p-2 rounded focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full border-gray-300 border p-2 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a category</option>
            <option value="shoes">Shoes</option>
            <option value="shirt">Shirt</option>
            <option value="pants">Pants</option>
            <option value="hats">Hats</option>
            <option value="baby_wears">Baby wears</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-2">
            Price $
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="w-full border-gray-300 border p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-2">
            Thumbnail Image Url
          </label>
          {/* <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border-gray-300 border p-2 rounded focus:outline-none focus:border-blue-500"
            /> */}
          <input
            type="text"
            id="imgUrl"
            value={imgUrl}
            onChange={handleImgUrl}
            className="w-full border-gray-300 border p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-2">
            Alt Images{" "}
            <span className="text-sm">(Add a space between the links) </span>
          </label>
          {/* <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border-gray-300 border p-2 rounded focus:outline-none focus:border-blue-500"
            /> */}
          <input
            type="text"
            id="imgUrl"
            value={altImages}
            onChange={(e) => setAltImages(e.target.value)}
            className="w-full border-gray-300 border p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-2">
            Sizes available:
            <span className="ml-2 text-sm">(Add "," between the sizes)</span>
          </label>
          {/* <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border-gray-300 border p-2 rounded focus:outline-none focus:border-blue-500"
            /> */}
          <input
            type="text"
            id="imgUrl"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border-gray-300 border p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="space-x-2">
          <button
            type="submit"
            className=" text-black hover:bg-green-700 hover:border-green-700 hover:text-white border-[1px] border-black px-4 py-2 rounded hover:bg-slate-500 duration-100  hover:border-slate-500"
          >
            Update
          </button>
          <button
            type="submit"
            className=" text-white bg-red-700 hover:bg-red-900 hover:border-red-700 hover:text-white border-[1px] border-red-700 px-4 py-2 rounded duration-100  hover:border-slate-500"
          >
            Cancel
          </button>
        </div>
        <div className="text-red-700 mt-2">
          {message == "" ? <></> : <div>{message}</div>}
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
