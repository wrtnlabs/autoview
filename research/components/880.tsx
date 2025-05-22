import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Commit Activity
   *
   * @title Commit Activity
   */
  export type commit_activity = {
    days: (number & tags.Type<"int32">)[];
    total: number & tags.Type<"int32">;
    week: number & tags.Type<"int32">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.commit_activity[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and transformation
  const weeks = value;
  if (weeks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No commit activity</p>
      </div>
    );
  }
  const totals = weeks.map((w) => w.total);
  const maxCommits = Math.max(...totals);
  const sumCommits = totals.reduce((sum, curr) => sum + curr, 0);
  const avgCommits = sumCommits / weeks.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.BarChart2 className="text-blue-500" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Commit Activity
        </h2>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
          <span>Weeks: {weeks.length}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Activity size={16} className="text-gray-400 mr-1" />
          <span>Avg: {avgCommits.toFixed(1)}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.TrendingUp size={16} className="text-green-500 mr-1" />
          <span>Max: {maxCommits}</span>
        </div>
      </div>

      {/* Bar chart per week */}
      <div className="space-y-2">
        {weeks.map((w) => {
          const date = new Date(w.week * 1000);
          const label = date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });
          const widthPercent =
            maxCommits > 0 ? (w.total / maxCommits) * 100 : 0;
          return (
            <div key={w.week} className="flex items-center">
              <span className="w-16 text-xs text-gray-500">{label}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden mx-2">
                <div
                  className="h-2 bg-blue-500"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              <span className="w-8 text-right text-sm text-gray-700">
                {w.total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
