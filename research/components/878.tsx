import React from "react";
export namespace AutoViewInputSubTypes {
    export type simple_user = any;
    export type stargazer = any;
}
export type AutoViewInput = any[] | any[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const dataArray: any[] = Array.isArray(value) ? value : [];
  if (dataArray.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 italic">
        No data available.
      </div>
    );
  }

  // Determine which keys to display, filtering out internal or ID fields.
  const columnsSet = new Set<string>();
  dataArray.forEach(item => {
    if (item && typeof item === 'object') {
      Object.keys(item).forEach(key => {
        const lower = key.toLowerCase();
        if (
          !key.startsWith('_') &&
          !/internal/.test(lower) &&
          !/id$/.test(lower)
        ) {
          columnsSet.add(key);
        }
      });
    }
  });
  const columns = Array.from(columnsSet);

  // Format different types of cell values for display.
  function formatValue(cell: any): React.ReactNode {
    if (cell == null) {
      return <span className="text-gray-400">—</span>;
    }
    if (typeof cell === 'boolean') {
      const classes = cell
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800';
      const text = cell ? 'Yes' : 'No';
      return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${classes}`}>
          {text}
        </span>
      );
    }
    if (typeof cell === 'number') {
      return cell.toLocaleString();
    }
    if (typeof cell === 'string') {
      // Detect ISO date strings (approximate)
      const isoMatch = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(cell);
      if (isoMatch) {
        const date = new Date(cell);
        if (!isNaN(date.getTime())) {
          return (
            date.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }) +
            ', ' +
            date.toLocaleTimeString(undefined, {
              hour: 'numeric',
              minute: '2-digit',
            })
          );
        }
      }
      // Truncate long text
      if (cell.length > 100) {
        const truncated = cell.slice(0, 100) + '...';
        return (
          <span title={cell} className="truncate block max-w-xs">
            {truncated}
          </span>
        );
      }
      return cell;
    }
    if (Array.isArray(cell)) {
      // Render string arrays as badges
      if (cell.every(item => typeof item === 'string')) {
        return (
          <div className="flex flex-wrap -m-1">
            {cell.map((tag, i) => (
              <span
                key={i}
                className="m-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        );
      }
      // Fallback for other arrays
      return <span className="text-sm">{JSON.stringify(cell)}</span>;
    }
    if (typeof cell === 'object') {
      // Fallback for nested objects
      return <span className="text-sm">{JSON.stringify(cell)}</span>;
    }
    return String(cell);
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th
                key={col}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {dataArray.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              {columns.map(col => (
                <td
                  key={col}
                  className="px-4 py-2 text-sm text-gray-700 align-top max-w-xs"
                >
                  {formatValue(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
