import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Content Traffic
     *
     * @title Content Traffic
    */
    export interface content_traffic {
        path: string;
        title: string;
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.content_traffic[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation
  const totalCount = value.reduce((sum, item) => sum + item.count, 0);
  const totalUniques = value.reduce((sum, item) => sum + item.uniques, 0);

  // 2. Empty-state handling
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span className="text-sm">No traffic data available</span>
      </div>
    );
  }

  // 3. Sort items by descending view count
  const sorted = [...value].sort((a, b) => b.count - a.count);

  // 4. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <LucideReact.BarChart2
            size={20}
            strokeWidth={1.5}
            className="mr-2 text-gray-500"
          />
          Content Traffic
        </h2>
        <div className="flex space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <LucideReact.Eye size={16} className="mr-1 text-gray-500" />
            <span>{totalCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Users size={16} className="mr-1 text-gray-500" />
            <span>{totalUniques.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <ul className="divide-y divide-gray-200">
        {sorted.map((item) => {
          const percent =
            totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0;
          return (
            <li
              key={item.path}
              className="py-3 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">
                  {item.title}
                </p>
                <p className="truncate text-xs text-gray-500">{item.path}</p>
              </div>
              <div className="mt-2 md:mt-0 flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <LucideReact.Eye size={16} className="mr-1 text-gray-500" />
                  <span>{item.count.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Users size={16} className="mr-1 text-gray-500" />
                  <span>{item.uniques.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500">{percent}%</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
