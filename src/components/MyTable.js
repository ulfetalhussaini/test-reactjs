import React, { useEffect, useState } from "react";
import useHTTP from "../hooks/useHTTP";
import useHeaders from "../hooks/useHeaders";
import useTableStore from "../store/useTableStore";
import MyInput from "./MyInput";
import MyButton from "./MyButton";

const cellStyle = {
  padding: "5px",
  fontSize: '18px'
};

function MyTable({ tableName, editable, endpoint }) {
  const { tables, updateTableData } = useTableStore();
  const { sendHTTP, res } = useHTTP();
  const { state: headers } = useHeaders();
  const [tableHeaders, setTableHeaders] = useState([]);
  const [editableRowData, setEditableRowData] = useState({});

  useEffect(() => {
    // Fetch data from the endpoint
    if (endpoint) {
      sendHTTP(endpoint, "GET", null);
    }
  }, [sendHTTP, endpoint]);

  useEffect(() => {
    // Update table data in the global state when the HTTP response data changes
    if (!res?.loading && !res?.error && res?.data !== null) {
      updateTableData(tableName, res?.data);
    }
  }, [res, tableName, updateTableData]);

  useEffect(() => {
    // Set the table headers from the global state based on the provided tableName
    if (tableName && headers[tableName]) {
      setTableHeaders(Object?.keys(headers[tableName]));
    }
  }, [tableName, headers]);

  const isEmptyRow = (row) => {
    return (row.name && row.age) || (row.account_id && row.amount);
  };

  const handleEdit = (rowData, rowIndex) => {
    // Set the editableRowData state
    setEditableRowData({ ...rowData, editing: true, index: rowIndex });
  };

  const handleSaveEdit = (rowData, rowIndex) => {
    // When the save button is clicked after editing, update the global state
    if (isEmptyRow(editableRowData)) {
      const updatedData = tables[tableName]?.data.map((row, index) => {
        if (index === rowIndex) {
          return editableRowData;
        }
        return row;
      });
      updateTableData(tableName, updatedData);
      setEditableRowData({});
    }
  };

  const handleCancelEdit = () => {
    // Cancel the editing and reset the editableRowData state
    setEditableRowData({});
  };

  const handleAddRow = () => {
    // Add a new row to the local state for editing
    const newRowData = { name: "", age: "", editing: true, index: -1 };
    setEditableRowData(newRowData);
  };

  const handleSaveNewRow = () => {
    // Save the new row to the global state
    //
    if (isEmptyRow(editableRowData) && editableRowData.index === -1) {
      const updatedData = [...tables[tableName]?.data, editableRowData];
      updateTableData(tableName, updatedData);
      setEditableRowData({});
    }
  };

  const handleDeleteRow = (rowIndex) => {
    // Delete the specified row from the global state
    const updatedData = tables[tableName].data?.filter(
      (_, index) => index !== rowIndex
    );
    updateTableData(tableName, updatedData);
  };

  const tableDataForTable = tables[tableName] || { data: [] };

  return (
    <div style={{ margin: "30px", textAlign: "right" }}>
      {editable && <MyButton BtnTxt="اضافة صف" HandleFunc={handleAddRow} />}
      <table border={1} width={"100%"} dir="rtl">
        <thead>
          <tr>
            {tableHeaders?.map((header, index) => (
              <th key={index} style={cellStyle}>
                {headers[tableName][header]}
              </th>
            ))}
            {editable && <th style={cellStyle}>تحديث</th>}
          </tr>
        </thead>
        <tbody>
          {tableDataForTable?.data?.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {tableHeaders?.map((header, index) => (
                <td key={index} style={cellStyle}>
                  {editableRowData?.editing &&
                  editableRowData?.index === rowIndex ? (
                    <MyInput
                      Header={header}
                      EditableRowData={editableRowData}
                      SetEditableRowData={setEditableRowData}
                    />
                  ) : (
                    rowData[header]
                  )}
                </td>
              ))}
              {editable && (
                <td style={cellStyle}>
                  {editableRowData?.editing &&
                  editableRowData?.index === rowIndex ? (
                    <>
                      <MyButton
                        BtnTxt="حفظ"
                        HandleFunc={() => handleSaveEdit(rowData, rowIndex)}
                      />
                      <MyButton BtnTxt="الغاء" HandleFunc={handleCancelEdit} />
                    </>
                  ) : (
                    <>
                      <MyButton
                        BtnTxt="تعديل"
                        HandleFunc={() => handleEdit(rowData, rowIndex)}
                      />
                      <MyButton
                        BtnTxt="حذف"
                        HandleFunc={() => handleDeleteRow(rowIndex)}
                      />
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
          {editableRowData?.editing && editableRowData?.index === -1 && (
            <tr>
              {tableHeaders?.map((header, index) => (
                <td key={index} style={cellStyle}>
                  <MyInput
                    Header={header}
                    EditableRowData={editableRowData}
                    SetEditableRowData={setEditableRowData}
                  />
                </td>
              ))}
              <td style={cellStyle}>
                <MyButton BtnTxt="حفظ" HandleFunc={handleSaveNewRow} />
                <MyButton BtnTxt="الغاء" HandleFunc={handleCancelEdit} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyTable;
