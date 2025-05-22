import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Referrer Traffic
   *
   * @title Referrer Traffic
   */
  export type referrer_traffic = {
    referrer: string;
    count: number & tags.Type<"int32">;
    uniques: number & tags.Type<"int32">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.referrer_traffic[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.reduce((sum, item) => sum + item.count, 0);
  const sortedData = [...value].sort((a, b) => b.count - a.count);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Link size={20} className="text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Referrer Traffic
        </h2>
      </div>

      {sortedData.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 py-8">
          <LucideReact.AlertCircle size={24} className="mb-2" />
          <span>No referrer data available</span>
        </div>
      ) : (
        <ul className="space-y-6">
          {sortedData.map((item) => {
            const percentage =
              totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0;
            return (
              <li key={item.referrer}>
                <div className="flex justify-between items-center mb-1">
                  <span
                    className="text-sm font-medium text-gray-700 truncate"
                    title={item.referrer}
                  >
                    {item.referrer}
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <LucideReact.Eye size={16} className="mr-1" />
                      <span>{item.count}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <LucideReact.Users size={16} className="mr-1" />
                      <span>{item.uniques}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-8 text-right">
                    {percentage}%
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
