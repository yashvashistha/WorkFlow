import React from "react";

const ProcessTable = ({ data }) => {
  if (!data || typeof data !== "object") {
    return null;
  }

  const firstKey = Object.keys(data)[0];
  const rowCount = data[firstKey]?.length || 0;

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0 border border-gray-300 text-sm text-left table-auto">
        <thead className="bg-gray-100">
          <tr>
            {Object.keys(data).map((key) => (
              <th
                key={key}
                className="border-4 border-gray-300 p-2 font-semibold whitespace-nowrap"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rowCount - 1)].map((_, i) => (
            <tr key={i}>
              {Object.keys(data).map((key) => (
                <td
                  key={key}
                  className="border-4 border-gray-300 p-2 whitespace-nowrap"
                >
                  {data[key][i + 1] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;
