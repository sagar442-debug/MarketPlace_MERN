import React, { useEffect, useState } from "react";
import BagList from "../components/BagList";

const AddToBag = () => {
  const [bagDetails, setBagDetails] = useState();

  useEffect(() => {});

  const addToBag = async () => {
    console.log("nothing");
  };

  return (
    <div className="h-[100vh]">
      <BagList />
    </div>
  );
};

export default AddToBag;
