import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const totalClones = value.count;
  const uniqueVisitors = value.uniques;

  // Sort clones by timestamp descending and pick the most recent 5 entries
  const sortedClones = [...value.clones].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
  const recentClones = sortedClones.slice(0, 5);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Summary Metrics */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div className="flex items-center text-gray-800">
          <LucideReact.Users className="mr-2 text-gray-500" size={20} />
          <div>
            <div className="text-2xl font-semibold">{totalClones}</div>
            <div className="text-sm text-gray-500">Total Clones</div>
          </div>
        </div>
        <div className="flex items-center text-gray-800 mt-4 sm:mt-0">
          <LucideReact.User className="mr-2 text-gray-500" size={20} />
          <div>
            <div className="text-2xl font-semibold">{uniqueVisitors}</div>
            <div className="text-sm text-gray-500">Unique Visitors</div>
          </div>
        </div>
      </div>

      {/* Recent Traffic Table */}
      <div>
        <div className="text-lg font-medium text-gray-800 mb-2">
          Recent Traffic
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Clones</th>
                <th className="py-2 px-3">Uniques</th>
              </tr>
            </thead>
            <tbody>
              {recentClones.map((entry, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-2 px-3">
                    <div className="flex items-center">
                      <LucideReact.Calendar
                        className="text-gray-400 mr-1"
                        size={16}
                      />
                      <span className="whitespace-nowrap">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center">
                      <LucideReact.Copy
                        className="text-gray-400 mr-1"
                        size={16}
                      />
                      <span>{entry.count}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center">
                      <LucideReact.UserPlus
                        className="text-gray-400 mr-1"
                        size={16}
                      />
                      <span>{entry.uniques}</span>
                    </div>
                  </td>
                </tr>
              ))}

              {recentClones.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 px-3 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center">
                      <LucideReact.AlertCircle
                        className="text-gray-400 mr-2"
                        size={24}
                      />
                      <span>No traffic data available</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
