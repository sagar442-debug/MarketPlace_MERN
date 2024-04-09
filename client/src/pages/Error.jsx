import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status == 404) {
    return (
      <div className="text-center mt-5">
        <h1 className="text-5xl font-semibold my-5">Ohh! Page not found</h1>
        <p className="text-3xl">
          The page you are looking for doesn't seem to exist
        </p>
        <Link className="text-xl text-blue-600 underline" to={"/"}>
          Back to home
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold">Something went wrong!!!</h1>
      <Link className="text-xl" to={"/"}>
        Back to home
      </Link>
    </div>
  );
};

export default Error;
