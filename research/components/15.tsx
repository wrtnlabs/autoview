import * as LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation
  const { value: mileageValue, created_at, code, source, direction } = value;
  const formattedDate = new Date(created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const sign = direction === 1 ? "+" : "−";
  const displayValue = mileageValue != null ? `${sign}${mileageValue}` : "—";
  const bgColor = direction === 1 ? "bg-green-100" : "bg-red-100";
  const iconColor = direction === 1 ? "text-green-500" : "text-red-500";
  const valueTextColor = direction === 1 ? "text-green-600" : "text-red-600";

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex items-center space-x-4">
      <div className={`p-2 rounded-full ${bgColor}`}>
        {direction === 1 ? (
          <LucideReact.Plus size={20} className={iconColor} strokeWidth={2} />
        ) : (
          <LucideReact.Minus size={20} className={iconColor} strokeWidth={2} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <LucideReact.Calendar size={14} className="mr-1" />
          <span className="truncate">{formattedDate}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <LucideReact.ShoppingCart size={14} className="mr-1 text-gray-400" />
          <span className="truncate">{source}</span>
          <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
            {code}
          </span>
        </div>
      </div>
      <div
        className={`flex items-baseline ${valueTextColor} text-lg font-semibold`}
      >
        {displayValue}
        <span className="ml-1 text-sm text-gray-400">pts</span>
      </div>
    </div>
  );
}
