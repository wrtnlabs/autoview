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
  const data = Array.isArray(value) ? value : [];
  const weeksCount = data.length;

  // Extract additions and deletions (absolute) safely
  const additionsArr = data.map((week) =>
    Array.isArray(week) && week.length > 1 ? week[1] : 0,
  );
  const deletionsArr = data.map((week) =>
    Array.isArray(week) && week.length > 2 ? Math.abs(week[2]) : 0,
  );

  const totalAdditions = additionsArr.reduce((sum, v) => sum + v, 0);
  const totalDeletions = deletionsArr.reduce((sum, v) => sum + v, 0);
  const netChange = totalAdditions - totalDeletions;

  // Format numbers with locale
  const fmt = (n: number) => n.toLocaleString();

  // Sparkline dimensions
  const SP_WIDTH = 100;
  const SP_HEIGHT = 40;

  // Prepare sparkline points for additions and deletions
  let addPoints = "";
  let delPoints = "";
  if (weeksCount > 1) {
    const maxVal = Math.max(...additionsArr, ...deletionsArr, 1);
    addPoints = additionsArr
      .map(
        (v, i) =>
          `${(i / (weeksCount - 1)) * SP_WIDTH},${SP_HEIGHT - (v / maxVal) * SP_HEIGHT}`,
      )
      .join(" ");
    delPoints = deletionsArr
      .map(
        (v, i) =>
          `${(i / (weeksCount - 1)) * SP_WIDTH},${SP_HEIGHT - (v / maxVal) * SP_HEIGHT}`,
      )
      .join(" ");
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (weeksCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No data available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Code Frequency</h2>
        <div className="flex items-center text-sm text-gray-500 gap-1">
          <LucideReact.Calendar size={16} />
          <span>{weeksCount} weeks</span>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1 text-blue-600">
          <LucideReact.Plus size={16} />
          <span>Additions: {fmt(totalAdditions)}</span>
        </div>
        <div className="flex items-center gap-1 text-red-600">
          <LucideReact.Minus size={16} />
          <span>Deletions: {fmt(totalDeletions)}</span>
        </div>
        <div className="flex items-center gap-1">
          {netChange > 0 ? (
            <LucideReact.ArrowUpRight className="text-green-500" size={16} />
          ) : netChange < 0 ? (
            <LucideReact.ArrowDownRight className="text-red-500" size={16} />
          ) : (
            <LucideReact.Minus className="text-gray-500" size={16} />
          )}
          <span>Net: {fmt(netChange)}</span>
        </div>
      </div>
      {/* Sparkline Chart */}
      {weeksCount > 1 ? (
        <svg
          className="w-full h-10"
          viewBox={`0 0 ${SP_WIDTH} ${SP_HEIGHT}`}
          fill="none"
          aria-label="Code frequency sparkline"
          role="img"
        >
          <polyline
            points={addPoints}
            stroke="#3B82F6"
            strokeWidth={1.5}
            fill="none"
          />
          <polyline
            points={delPoints}
            stroke="#EF4444"
            strokeWidth={1.5}
            fill="none"
          />
        </svg>
      ) : (
        <div className="text-center text-xs text-gray-500">
          Insufficient data for chart
        </div>
      )}
    </div>
  );
}
