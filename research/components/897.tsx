import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * View Traffic
     *
     * @title View Traffic
    */
    export interface view_traffic {
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
        views: AutoViewInputSubTypes.traffic[];
    }
    /**
     * @title Traffic
    */
    export interface traffic {
        timestamp: string & tags.Format<"date-time">;
        uniques: number & tags.Type<"int32">;
        count: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.view_traffic;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalViews = value.count;
  const totalUniques = value.uniques;
  // Sort recent entries by timestamp descending
  const sortedViews = [...value.views].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  // Only display the 10 most recent entries
  const recentViews = sortedViews.slice(0, 10);
  const formatDateTime = (ts: string): string =>
    new Date(ts).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Overview Header */}
      <h2 className="text-lg font-semibold mb-4">Traffic Overview</h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center p-3 bg-gray-50 rounded">
          <LucideReact.Eye className="text-gray-500 mr-2" size={20} />
          <div>
            <div className="text-sm text-gray-500">Total Views</div>
            <div className="text-xl font-medium text-gray-900">
              {totalViews.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded">
          <LucideReact.Users className="text-gray-500 mr-2" size={20} />
          <div>
            <div className="text-sm text-gray-500">Unique Visitors</div>
            <div className="text-xl font-medium text-gray-900">
              {totalUniques.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Traffic List */}
      <h3 className="text-md font-semibold mb-2">Recent Traffic</h3>
      <ul className="divide-y divide-gray-200">
        {recentViews.map((entry, idx) => (
          <li key={idx} className="flex justify-between items-center py-2">
            <div className="flex items-center text-sm text-gray-700">
              <LucideReact.Calendar
                className="text-gray-400 mr-1"
                size={16}
              />
              <span className="truncate">
                {formatDateTime(entry.timestamp)}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-700 space-x-4">
              <div className="flex items-center">
                <LucideReact.Eye className="text-gray-500 mr-1" size={16} />
                <span>{entry.count.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Users
                  className="text-gray-500 mr-1"
                  size={16}
                />
                <span>{entry.uniques.toLocaleString()}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
