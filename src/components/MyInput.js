import React from "react";

function MyInput({ Header, EditableRowData, SetEditableRowData }) {
  const isNumeric =
    Header === "age" || Header === "account_id" || Header === "amount";
  const maxInputLength = {
    age: 3,
    account_id: 10,
    amount: 10,
    name: 20,
  };

  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    if (isNumeric) {
      // Allow only numeric input
      inputValue = inputValue.replace(/[^0-9]/g);
    }

    if (inputValue.length > maxInputLength[Header]) {
      // Limit the input to the specified maxLength
      inputValue = inputValue.slice(0, maxInputLength[Header]);
    }

    SetEditableRowData({
      ...EditableRowData,
      [Header]: inputValue,
    });
  };

  return (
    <input
      type={isNumeric ? "number" : "text"}
      value={EditableRowData[Header]}
      onChange={handleInputChange}
      maxLength={maxInputLength[Header]}
    />
  );
}
export default MyInput;
