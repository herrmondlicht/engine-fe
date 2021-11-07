import { NoDataMessage } from "components";
import React from "react";
import { useTable } from "react-table";

const Table = ({ columns, data, onRowClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  if (data?.length === 0) {
    return <NoDataMessage />;
  }

  return (
    <div className="w-full overflow-auto">
      <table {...getTableProps()} className="h-full w-full table-auto">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  className="py-5 text-left"
                  key={column.id}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                key={i}
                {...row.getRowProps()}
                className={`hover:bg-gray-300 cursor-pointer ${
                  i % 2 ? "bg-gray-100" : ""
                }`}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.cells.map((cell, j) => {
                  return (
                    <td key={j} {...cell.getCellProps()} className="py-1">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
