import { useState, CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";

function LoadingComp() {
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading flex items-center justify-center h-[20vh]">
      <SyncLoader
        color={color}
        loading={loading}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default LoadingComp;
