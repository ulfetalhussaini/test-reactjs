import React, { useEffect, useState } from "react";
import useHTTP from "../hooks/useHTTP";
import useHeaders from "../hooks/useHeaders";
import useTableStore from "../store/useTableStore";

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

  //   useEffect(() => {
  //     // Update table data in the global state when the HTTP response data changes
  //     if (!res?.loading && !res?.error) {
  //       updateTableData(tableName, res?.data);
  //     }
  //   }, [res, tableName, updateTableData]);

  useEffect(() => {
    // Set the table headers from the global state based on the provided tableName
    if (tableName && headers[tableName]) {
      setTableHeaders(Object?.keys(headers[tableName]));
    }
  }, [tableName, headers]);

  const handleEdit = (rowData, rowIndex) => {
    setEditableRowData({ ...rowData, editing: true, index: rowIndex });
  };

  const handleSaveEdit = (rowData, rowIndex) => {
    // When the save button is clicked after editing, update the global state
    const updatedData = tables[tableName]?.data.map((row, index) => {
      if (index === rowIndex) {
        return editableRowData;
      }
      return row;
    });
    updateTableData(tableName, updatedData);
    setEditableRowData({});
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
    if (editableRowData.index === -1) {
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
    <div style={{ margin: "15px" }}>
      {editable && <button onClick={handleAddRow}>Add Row</button>}
      <table border={1} width={"100%"} dir="rtl">
        <tr>
          {tableHeaders?.map((header, index) => (
            <th key={index}>{headers[tableName][header]}</th>
          ))}
          {editable && <th>Update</th>}
        </tr>
        {tableDataForTable?.data?.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {tableHeaders?.map((header, index) => (
              <td key={index}>
                {editableRowData?.editing &&
                editableRowData?.index === rowIndex ? (
                  <input
                    type="text"
                    value={editableRowData[header]}
                    onChange={(e) =>
                      setEditableRowData({
                        ...editableRowData,
                        [header]: e.target.value,
                      })
                    }
                  />
                ) : (
                  rowData[header]
                )}
              </td>
            ))}
            {editable && (
              <td>
                {editableRowData?.editing &&
                editableRowData?.index === rowIndex ? (
                  <>
                    <button onClick={() => handleSaveEdit(rowData, rowIndex)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(rowData, rowIndex)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteRow(rowIndex)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            )}
          </tr>
        ))}
        {editableRowData?.editing && editableRowData?.index === -1 && (
          <tr>
            {tableHeaders?.map((header, index) => (
              <td key={index}>
                <input
                  type="text"
                  value={editableRowData[header]}
                  onChange={(e) =>
                    setEditableRowData({
                      ...editableRowData,
                      [header]: e.target.value,
                    })
                  }
                />
              </td>
            ))}
            <td>
              <button onClick={handleSaveNewRow}>Save</button>
            </td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default MyTable;
