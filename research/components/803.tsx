import { tags } from "typia";
import React from "react";
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
  const entries: { lang: string; count: number }[] = Object.entries(value)
    .map(([lang, count]) => ({ lang, count }))
    .sort((a, b) => b.count - a.count);

  const total = entries.reduce((sum, e) => sum + e.count, 0);

  const formatNumber = (num: number): string =>
    num.toLocaleString(undefined, { maximumFractionDigits: 0 });

  if (entries.length === 0 || total === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No data available
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Language Distribution
      </h2>
      <div className="space-y-4">
        {entries.map(({ lang, count }) => {
          const percent = total > 0 ? +(count / total * 100).toFixed(1) : 0;
          return (
            <div key={lang}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 truncate">
                  {lang}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {formatNumber(count)} ({percent}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
                <div
                  className="bg-blue-500 h-2 rounded"
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
