import React from "react";

function MyInput({ Header, EditableRowData, SetEditableRowData }) {
  return (
    <input
      type={
        Header === "age" || Header === "account_id" || Header === "amount"
          ? "number"
          : "text"
      }
      value={EditableRowData[Header]}
      onChange={(e) => {
        if (
          Header === "age" ||
          Header === "account_id" ||
          Header === "amount"
        ) {
          e.target.value = e.target.value.replace(/[^0-9]/g);
        }
        SetEditableRowData({
          ...EditableRowData,
          [Header]: e.target.value,
        });
      }}
      onInput={(e) => {
        if (
          (Header === "age" && e.target.value.length > 3) ||
          ((Header === "account_id" || Header === "amount") &&
            e.target.value.length > 10) ||
          (Header === "name" && e.target.value.length > 20)
        ) {
          e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
      }}
      maxLength={
        Header === "age"
          ? 3
          : Header === "account_id" || Header === "amount"
          ? 10
          : Header === "name"
          ? 20
          : undefined
      }
    />
  );
}
export default MyInput;
