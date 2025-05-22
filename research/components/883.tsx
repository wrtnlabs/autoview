import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Code Frequency Stat
     *
     * @title Code Frequency Stat
    */
    export type code_frequency_stat = (number & tags.Type<"int32">)[];
}
export type AutoViewInput = AutoViewInputSubTypes.code_frequency_stat[];



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No code frequency data available.
      </div>
    );
  }

  const totalAdditions = value.reduce((sum, week) => sum + (week[1] ?? 0), 0);
  const totalDeletions = value.reduce((sum, week) => sum + (week[2] ?? 0), 0);
  const netChange = totalAdditions - totalDeletions;

  const recent = value.slice(-5);
  const formatDate = (ts: number) =>
    new Date(ts * 1000).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-sm font-medium text-green-700">Total Additions</div>
          <div className="mt-1 text-2xl font-semibold text-green-800">
            {totalAdditions.toLocaleString()}
          </div>
        </div>
        <div className="flex-1 bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-sm font-medium text-red-700">Total Deletions</div>
          <div className="mt-1 text-2xl font-semibold text-red-800">
            {totalDeletions.toLocaleString()}
          </div>
        </div>
        <div
          className={`flex-1 p-4 rounded-lg border ${
            netChange >= 0 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="text-sm font-medium text-blue-700">Net Change</div>
          <div className="mt-1 text-2xl font-semibold text-blue-800">
            {netChange >= 0
              ? `+${netChange.toLocaleString()}`
              : netChange.toLocaleString()}
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Recent 5 Weeks</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 pr-4">Week</th>
                <th className="py-2 pr-4">Additions</th>
                <th className="py-2">Deletions</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((week, idx) => {
                const date = formatDate(week[0] ?? 0);
                const adds = week[1] ?? 0;
                const dels = week[2] ?? 0;
                return (
                  <tr key={idx} className="border-t border-gray-100">
                    <td className="py-2 pr-4 text-gray-800">{date}</td>
                    <td className="py-2 pr-4 text-green-600 font-medium">
                      +{adds.toLocaleString()}
                    </td>
                    <td className="py-2 text-red-600 font-medium">
                      -{dels.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
