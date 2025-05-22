import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Referrer Traffic
     *
     * @title Referrer Traffic
    */
    export type referrer_traffic = {
        referrer: string;
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.referrer_traffic[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalVisits = value.reduce((sum, item) => sum + item.count, 0);
  const totalUniques = value.reduce((sum, item) => sum + item.uniques, 0);
  const sortedData = [...value].sort((a, b) => b.count - a.count);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Referrer Traffic</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-500 uppercase">Total Visits</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{totalVisits.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-500 uppercase">Unique Visitors</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{totalUniques.toLocaleString()}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Source</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">Visits</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">Uniques</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">Share</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              const share =
                totalVisits > 0
                  ? ((item.count / totalVisits) * 100).toFixed(1)
                  : "0.0";
              return (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3 text-gray-800 truncate max-w-xs">{item.referrer || "Direct"}</td>
                  <td className="px-4 py-3 text-right text-gray-800">{item.count.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-800">{item.uniques.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-800">{share}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
