import React from "react";
import { CiCirclePlus } from "react-icons/ci";

function AddComponentButton({ setShowOptionsButtons, showOptionsButtons }) {
  //const ComponentId = props.id;
  // const handlecomponentRendering = props.handlecomponentRendering;

  return (
    <>
      <button
        id={"AddComponentBtn"}
        onMouseEnter={() =>
          (document.getElementById(`AddComponentBtn`).style.backgroundColor =
            "gray")
        }
        onMouseLeave={() =>
          (document.getElementById(`AddComponentBtn`).style.backgroundColor =
            "white")
        }
        style={{
          backgroundColor: "white",
          borderRadius: "50%",
          padding: 0,
          border: "none",
        }}
        onClick={() => {
          if (showOptionsButtons) {
            setShowOptionsButtons(false);
          } else {
            setShowOptionsButtons(true);
          }
        }}
      >
        <CiCirclePlus style={{ width: "50px", height: "50px" }} />
      </button>
    </>
  );
}

export default AddComponentButton;
