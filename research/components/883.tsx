import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stats = value || [];
  const totalWeeks = stats.length;

  // Sum additions and deletions (assume index 1 = additions, index 2 = deletions)
  const totalAdditions = stats.reduce((sum, week) => sum + (week[1] || 0), 0);
  const totalDeletions = stats.reduce(
    (sum, week) => sum + Math.abs(week[2] || 0),
    0,
  );

  const avgAdditions = totalWeeks > 0 ? totalAdditions / totalWeeks : 0;
  const avgDeletions = totalWeeks > 0 ? totalDeletions / totalWeeks : 0;

  // Net changes per week (additions - deletions)
  const netChanges = stats.map(
    (week) => (week[1] || 0) - Math.abs(week[2] || 0),
  );

  // Determine scale for sparkline bars
  const maxChange = Math.max(
    1,
    Math.max(...netChanges),
    Math.abs(Math.min(...netChanges)),
  );

  // Placeholder if no data
  if (totalWeeks === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No code frequency data available</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
      {/* Header with icon */}
      <div className="flex items-center mb-4">
        <LucideReact.BarChart2 size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Code Frequency Summary
        </h2>
      </div>

      {/* Summary grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <LucideReact.PlusCircle size={16} className="text-green-500" />
          <div>
            <div className="text-sm text-gray-500">Total Additions</div>
            <div className="text-base font-medium text-gray-800">
              {totalAdditions.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.MinusCircle size={16} className="text-red-500" />
          <div>
            <div className="text-sm text-gray-500">Total Deletions</div>
            <div className="text-base font-medium text-gray-800">
              {totalDeletions.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.TrendingUp size={16} className="text-green-500" />
          <div>
            <div className="text-sm text-gray-500">Avg Additions/week</div>
            <div className="text-base font-medium text-gray-800">
              {avgAdditions.toLocaleString(undefined, {
                maximumFractionDigits: 1,
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.TrendingDown size={16} className="text-red-500" />
          <div>
            <div className="text-sm text-gray-500">Avg Deletions/week</div>
            <div className="text-base font-medium text-gray-800">
              {avgDeletions.toLocaleString(undefined, {
                maximumFractionDigits: 1,
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sparkline of net changes */}
      <div>
        <div className="flex items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            Net Changes Over Time
          </span>
        </div>
        <div
          role="img"
          aria-label="Net code changes sparkline"
          className="w-full h-24 overflow-x-auto overflow-y-hidden"
        >
          <div className="flex items-end h-full space-x-1 pr-1">
            {netChanges.map((change, idx) => {
              const heightPercent = Math.abs((change / maxChange) * 100);
              const colorClass = change >= 0 ? "bg-green-400" : "bg-red-400";
              return (
                <div key={idx} className="flex-1">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`${colorClass} w-full`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Week 1</span>
          <span>Week {totalWeeks}</span>
        </div>
      </div>
    </div>
  );
}
