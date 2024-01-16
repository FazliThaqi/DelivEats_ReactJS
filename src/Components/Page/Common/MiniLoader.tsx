import React from "react";

function MiniLoader({ type = "warning", size = 100 }) {
  return (
    <div
      className={`spinner-border text-${size}`}
      style={{ scale: `${type}%` }}
    >
      {" "}
    </div>
  );
}

export default MiniLoader;
