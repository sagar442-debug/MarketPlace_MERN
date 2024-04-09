import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductUploadPage = () => {
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

  useEffect(() => {
    const checkToken = () => {
      if (!token) {
        navigate("/");
      }
    };
    checkToken();
  }, []);

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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newMessage = "";

    if (title.length < 15) {
      newMessage = "Title must be at least 15 characters!";
    } else if (title.length > 35) {
      newMessage = "The title must be less than 35 characters.";
    } else if (description.length < 50) {
      newMessage = "The description must be at least 50 characters.";
    } else if (category === "") {
      newMessage =
        "Set a category please if not available select buy and sell.";
    } else if (!price) {
      newMessage = "Please enter a price";
    } else if (!imgUrl) {
      newMessage = "Please enter the price of product";
    } else if (!size) {
      newMessage = "Please add at least one size";
    }

    if (newMessage) {
      setMessage(newMessage);
      return; // Return early if there's a validation error
    }

    try {
      const response = await fetch("http://localhost:5001/category/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          price,
          imgUrl,
          altImages,
          size,
        }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex mt-10 justify-center min-h-screen font-monsterrat">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-4 text-center text-white">
          Upload a Product
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-[0_30px_30px_0px_rgba(0,0,0,0.5)] border-[1px] rounded px-8 pt-6 pb-8 mb-4"
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
          <button
            type="submit"
            className=" text-black hover:bg-green-700 hover:border-green-700 hover:text-white border-[1px] border-black px-4 py-2 rounded hover:bg-slate-500 duration-100  hover:border-slate-500"
          >
            Upload
          </button>
          <div className="text-red-700 mt-2">
            {message == "" ? <></> : <div>{message}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUploadPage;
