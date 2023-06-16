import React from "react";
import "./Footer.css";

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        backgroundColor: "#6a7a91",
        color: "#ffffff",
        height: "62px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <span onClick={scrollToTop}>Back to top</span>
    </div>
  );
};

export default BackToTop;
