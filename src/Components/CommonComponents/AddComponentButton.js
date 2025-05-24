import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

function AddComponentButton({ setShowOptionsButtons, showOptionsButtons }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setShowOptionsButtons(!showOptionsButtons);
  };

  return (
    <button
      id="AddComponentBtn"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        backgroundColor: isHovered ? "gray" : "white",
        borderRadius: "50%",
        padding: 0,
        border: "none",
        cursor: "pointer",
      }}
    >
      <CiCirclePlus style={{ width: "50px", height: "50px" }} />
    </button>
  );
}

export default AddComponentButton;
