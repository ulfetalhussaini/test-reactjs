import React from "react";

const buttonStyle = {
  margin: "5px",
  padding: "8px 16px",
  backgroundColor: "#0073e6",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: '18px'
};

function MyButton({ BtnTxt, HandleFunc }) {
  return (
    <button onClick={HandleFunc} style={buttonStyle}>
      {BtnTxt}
    </button>
  );
}
export default MyButton;
