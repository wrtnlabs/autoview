import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Content Traffic
     *
     * @title Content Traffic
    */
    export type content_traffic = {
        path: string;
        title: string;
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.content_traffic[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.reduce((sum, item) => sum + item.count, 0);
  const totalUniques = value.reduce((sum, item) => sum + item.uniques, 0);

  function formatNumber(n: number): string {
    if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    return n.toString();
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Content Traffic Summary</h2>
        <div className="mt-2 flex flex-wrap gap-x-4 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-900">{formatNumber(totalCount)}</span> views
          </div>
          <div>
            <span className="font-medium text-gray-900">{formatNumber(totalUniques)}</span> uniques
          </div>
        </div>
      </header>
      <ul className="divide-y divide-gray-200">
        {value.map((item, idx) => (
          <li key={idx} className="py-3">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="flex-1 min-w-0">
                <p className="truncate text-blue-600 font-medium">{item.title}</p>
                <p className="truncate text-xs text-gray-500">{item.path}</p>
              </div>
              <div className="mt-2 sm:mt-0 flex space-x-4 text-sm text-gray-700">
                <span>
                  <span className="font-semibold">{formatNumber(item.count)}</span> views
                </span>
                <span>
                  <span className="font-semibold">{formatNumber(item.uniques)}</span> uniques
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
