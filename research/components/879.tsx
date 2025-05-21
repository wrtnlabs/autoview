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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Handle empty or invalid data
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No code frequency data available.
      </div>
    );
  }

  // 1. Transform raw data into structured stats and sort by date
  type Stat = { date: Date; additions: number; deletions: number };
  const stats: Stat[] = value
    .map((entry) => {
      const [timestamp = 0, additions = 0, deletions = 0] = entry;
      return {
        date: new Date(timestamp * 1000),
        additions,
        deletions,
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // 2. Compute aggregate metrics
  const totalAdditions = stats.reduce((sum, s) => sum + s.additions, 0);
  const totalDeletions = stats.reduce((sum, s) => sum + s.deletions, 0);
  const netChanges = totalAdditions - totalDeletions;
  const averageNet = stats.length > 0 ? netChanges / stats.length : 0;

  // 3. Prepare recent weeks (last 5)
  const recentStats = stats.slice(-5);
  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  // 4. Render the visual component
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <div className="text-sm font-medium text-gray-500 uppercase">
            Total Additions
          </div>
          <div className="mt-1 text-2xl font-semibold text-green-600">
            {totalAdditions.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <div className="text-sm font-medium text-gray-500 uppercase">
            Total Deletions
          </div>
          <div className="mt-1 text-2xl font-semibold text-red-600">
            {totalDeletions.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <div className="text-sm font-medium text-gray-500 uppercase">
            Net Changes
          </div>
          <div className="mt-1 text-2xl font-semibold text-gray-800">
            {netChanges.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <div className="text-sm font-medium text-gray-500 uppercase">
            Avg Net/Week
          </div>
          <div className="mt-1 text-2xl font-semibold text-gray-800">
            {averageNet.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Recent Weeks Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Week
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Additions
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deletions
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {recentStats.map((stat, idx) => {
              const net = stat.additions - stat.deletions;
              return (
                <tr key={idx}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {formatDate(stat.date)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-green-600 text-right">
                    +{stat.additions.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600 text-right">
                    -{stat.deletions.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 text-right">
                    {net >= 0 ? "+" : "-"}
                    {Math.abs(net).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-2 text-sm text-gray-500">
        Showing last {recentStats.length} weeks out of {stats.length}
      </div>
    </div>
  );
}
