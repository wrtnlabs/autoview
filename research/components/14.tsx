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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { value: mileageValue, created_at, code, source, direction } = value;
  const isCredit = direction === 1;
  const displayValue =
    mileageValue != null
      ? `${isCredit ? "+" : "-"}${mileageValue.toLocaleString()}`
      : "N/A";
  const textColor =
    mileageValue == null
      ? "text-gray-400"
      : isCredit
        ? "text-green-600"
        : "text-red-600";
  const ValueIcon =
    mileageValue == null ? (
      <LucideReact.AlertCircle className="text-gray-400" size={20} />
    ) : isCredit ? (
      <LucideReact.ArrowUp className="text-green-500" size={20} />
    ) : (
      <LucideReact.ArrowDown className="text-red-500" size={20} />
    );
  const formattedDate = new Date(created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    For mobile-first design, use flex-col on small and row on larger screens.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-2">
        {ValueIcon}
        <span className={`text-lg font-semibold ${textColor}`}>
          {displayValue}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-1 sm:space-y-0 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Tag size={16} className="text-gray-400" />
          <span className="truncate">{code}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate">{source}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <time dateTime={created_at}>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
