import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductSearchingPage = () => {
  const params = useParams();
  const [productTitle, setProductTitle] = useState(params.productTitle);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setProductTitle(params.productTitle.replace(/-/g, " "));
    fetchData();
  }, [params.productTitle]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/product/search?term=${{ productTitle }}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("There was an error fetching the data");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error trying to fetch", error.message);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="min-h-[95vh] font-monsterrat">
      <div className="title-stuff mt-5 flex justify-between items-center ">
        <h1 className="text-white text-lg">Results for: {productTitle}</h1>
        <select
          className="p-1"
          id="dropdown"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option className="outline-none" value="option1">
            Option 1
          </option>
          <option className="outline-none" value="option2">
            Option 2
          </option>
          <option className="outline-none" value="option3">
            Option 3
          </option>
        </select>
      </div>
    </div>
  );
};

export default ProductSearchingPage;
