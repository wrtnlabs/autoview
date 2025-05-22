import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type IShoppingMileage = {
    id: string & tags.Format<"uuid">;
    value: null | number;
    created_at: string & tags.Format<"date-time">;
    code: string;
    source: string;
    direction: -1 | 1;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingMileage;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const mileage = value.value ?? 0;
  const isEarned = value.direction === 1;
  const formattedValue = `${isEarned ? "+" : "-"}${mileage}`;
  const dateObj = new Date(value.created_at);
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Select appropriate icon and color based on direction
  const Icon = isEarned ? LucideReact.ArrowUp : LucideReact.ArrowDown;
  const valueColor = isEarned ? "text-green-600" : "text-red-600";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3">
      {/* Header: code and date */}
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Tag size={16} className="mr-1 text-blue-500" />
          <span className="font-medium">Code:</span>
          <span className="ml-1 truncate">{value.code}</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <LucideReact.Calendar size={16} className="mr-1" />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
      </div>

      {/* Main value display */}
      <div className={`flex items-baseline ${valueColor}`}>
        <Icon size={20} className="mr-2" strokeWidth={2} aria-hidden="true" />
        <span className="text-2xl font-semibold">{formattedValue}</span>
        <span className="ml-1 text-lg font-normal text-gray-500">miles</span>
      </div>

      {/* Source information */}
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.Activity size={16} className="mr-1 text-gray-400" />
        <span className="font-medium">Source:</span>
        <span className="ml-1 capitalize truncate">{value.source}</span>
      </div>
    </div>
  );
}
