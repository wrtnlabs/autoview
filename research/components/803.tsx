import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Language
   *
   * @title Language
   */
  export type language = {
    [key: string]: number & tags.Type<"int32">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.language;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const entries = Object.entries(value) as [string, number][];
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No data available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Language Distribution
      </h3>
      <div className="space-y-4">
        {sortedEntries.map(([lang, count]) => {
          const percent = total > 0 ? (count / total) * 100 : 0;
          const percentLabel = `${percent.toFixed(1)}%`;

          return (
            <div key={lang}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {lang}
                </span>
                <span className="text-sm text-gray-600">{percentLabel}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-2 bg-indigo-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
