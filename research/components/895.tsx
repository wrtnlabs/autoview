import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // 1. Data aggregation and transformation
  const items = Array.isArray(value) ? value : [];
  const totalViews = items.reduce((sum, item) => sum + item.count, 0);
  const totalUniques = items.reduce((sum, item) => sum + item.uniques, 0);
  const sortedItems = [...items].sort((a, b) => b.count - a.count);
  const numberFormatter = new Intl.NumberFormat();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (sortedItems.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <LucideReact.AlertCircle
          size={48}
          className="mx-auto text-gray-400 mb-4"
        />
        <p className="text-gray-500">No traffic data available</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
        <div className="flex items-center text-gray-700">
          <LucideReact.Eye size={20} className="mr-2 text-gray-500" />
          <span className="font-semibold">
            {numberFormatter.format(totalViews)}
          </span>
          <span className="ml-1 text-gray-500">views</span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Users size={20} className="mr-2 text-gray-500" />
          <span className="font-semibold">
            {numberFormatter.format(totalUniques)}
          </span>
          <span className="ml-1 text-gray-500">unique visits</span>
        </div>
      </div>

      {/* Detailed list */}
      <ul className="space-y-3">
        {sortedItems.map((item, index) => (
          <li
            key={`${item.path}-${index}`}
            className="flex flex-col sm:flex-row sm:justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-800 font-medium truncate">
                {item.title}
              </h3>
              <p className="mt-1 text-gray-500 text-xs font-mono truncate">
                {item.path}
              </p>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-6 flex-shrink-0 flex gap-4">
              <div className="flex items-center text-gray-700">
                <LucideReact.Eye size={16} className="mr-1 text-gray-500" />
                <span className="text-sm font-medium">
                  {numberFormatter.format(item.count)}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <LucideReact.Users size={16} className="mr-1 text-gray-500" />
                <span className="text-sm font-medium">
                  {numberFormatter.format(item.uniques)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
