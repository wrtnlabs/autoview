import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Language
     *
     * @title Language
    */
    export interface language {
        [key: string]: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.language;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const entries = React.useMemo(
    () => Object.entries(value) as [string, number][],
    [value],
  );
  const sortedEntries = React.useMemo(
    () => [...entries].sort((a, b) => b[1] - a[1]),
    [entries],
  );
  const maxScore = sortedEntries.length > 0 ? sortedEntries[0][1] : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  if (sortedEntries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span className="text-sm">No language data available</span>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Globe className="text-blue-500" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">Languages</h2>
      </div>
      <ul className="space-y-4">
        {sortedEntries.map(([language, score]) => {
          const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
          return (
            <li key={language} className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 truncate">
                  {language}
                </span>
                <span className="text-sm text-gray-600">{score}</span>
              </div>
              <div
                className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={score}
                aria-valuemin={0}
                aria-valuemax={maxScore}
                aria-label={`${language}: ${score}`}
              >
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
