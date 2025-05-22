import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Clone Traffic
     *
     * @title Clone Traffic
    */
    export type clone_traffic = {
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
        clones: AutoViewInputSubTypes.traffic[];
    };
    /**
     * @title Traffic
    */
    export type traffic = {
        timestamp: string & tags.Format<"date-time">;
        uniques: number & tags.Type<"int32">;
        count: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.clone_traffic;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Sort clone entries by newest first
  const sortedEntries = [...value.clones].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  //    Helper to format date and time
  function formatDateTime(timestamp: string) {
    const dateObj = new Date(timestamp);
    const date = dateObj.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const time = dateObj.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
    return { date, time };
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Clone Traffic Summary</h2>

      <div className="flex flex-col sm:flex-row sm:justify-between mb-4 space-y-3 sm:space-y-0">
        <div className="flex-1 text-center">
          <p className="text-sm text-gray-500">Total Clones</p>
          <p className="text-2xl font-bold text-gray-900">{value.count}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-sm text-gray-500">Unique Visitors</p>
          <p className="text-2xl font-bold text-gray-900">{value.uniques}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-sm text-gray-500">Entries</p>
          <p className="text-2xl font-bold text-gray-900">{value.clones.length}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Time</th>
              <th className="px-2 py-1">Clones</th>
              <th className="px-2 py-1">Uniques</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry, idx) => {
              const { date, time } = formatDateTime(entry.timestamp);
              return (
                <tr key={idx} className="border-t border-gray-100">
                  <td className="px-2 py-1 truncate">{date}</td>
                  <td className="px-2 py-1 truncate">{time}</td>
                  <td className="px-2 py-1">{entry.count}</td>
                  <td className="px-2 py-1">{entry.uniques}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
  // 3. Return the React element.
}
