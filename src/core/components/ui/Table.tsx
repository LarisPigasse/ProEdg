// src/components/ui/Table.tsx
import React, { ReactNode } from "react";

// Tipi per le props
export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  keyExtractor: (item: T) => string | number;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (item: T) => void;
}

// Componente generico Table
function Table<T>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  emptyMessage = "Nessun dato disponibile",
  className = "",
  onRowClick,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Caricamento in corso...
      </div>
    );
  }

  if (data.length === 0) {
    return <div className="p-8 text-center text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.className || ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className={`hover:bg-gray-50 ${
                onRowClick ? "cursor-pointer" : ""
              }`}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((column, index) => {
                const cellContent =
                  typeof column.accessor === "function"
                    ? column.accessor(item)
                    : item[column.accessor];

                return (
                  <td
                    key={index}
                    className={`px-6 py-4 whitespace-nowrap ${
                      column.className || ""
                    }`}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
