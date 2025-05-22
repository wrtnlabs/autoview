import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * View Traffic
   *
   * @title View Traffic
   */
  export type view_traffic = {
    count: number & tags.Type<"int32">;
    uniques: number & tags.Type<"int32">;
    views: AutoViewInputSubTypes.traffic[];
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
export type AutoViewInput = AutoViewInputSubTypes.view_traffic;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { count, uniques, views } = value;
  const recordCount = views.length;
  const avgViews = recordCount > 0 ? Math.round(count / recordCount) : 0;
  const avgUniques = recordCount > 0 ? Math.round(uniques / recordCount) : 0;

  // Sort views by timestamp descending (most recent first)
  const sortedViews = [...views].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  // Date formatting helper
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Traffic Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <LucideReact.Eye className="text-gray-500" size={20} />
          <div className="ml-3">
            <div className="text-sm text-gray-500">Total Views</div>
            <div className="text-xl font-medium text-gray-900">
              {count.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <LucideReact.Users className="text-gray-500" size={20} />
          <div className="ml-3">
            <div className="text-sm text-gray-500">Unique Visitors</div>
            <div className="text-xl font-medium text-gray-900">
              {uniques.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Average Metrics */}
      {recordCount > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <div className="text-sm text-gray-500">Average per record</div>
          <div className="flex items-center mt-1 space-x-4">
            <div className="flex items-center text-gray-700">
              <LucideReact.Eye size={16} className="mr-1" />
              <span>{avgViews}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <LucideReact.Users size={16} className="mr-1" />
              <span>{avgUniques}</span>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Records */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-800 mb-2">
          Recent Traffic
        </h3>
        {recordCount > 0 ? (
          <ul className="space-y-2 max-h-64 overflow-auto">
            {sortedViews.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md"
              >
                <div className="flex items-center text-gray-700">
                  <LucideReact.Calendar
                    size={16}
                    className="mr-1 text-gray-500"
                  />
                  <span className="text-sm">{formatDate(item.timestamp)}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-700">
                    <LucideReact.Eye size={16} className="mr-1 text-gray-500" />
                    <span className="text-sm">
                      {item.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <LucideReact.Users
                      size={16}
                      className="mr-1 text-gray-500"
                    />
                    <span className="text-sm">
                      {item.uniques.toLocaleString()}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center text-gray-500">
            <LucideReact.AlertCircle size={24} className="mr-2" />
            <span>No detailed traffic records available.</span>
          </div>
        )}
      </div>
    </div>
  );
}
