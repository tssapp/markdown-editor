import React from "react";

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        borderRadius: "5px",
        padding: "10px",
        height: "200px",
        overflow: "scroll",
        border: "1px solid gray",
      }}
    >
      {children}
    </div>
  );
};
