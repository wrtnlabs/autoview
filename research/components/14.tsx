import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface IShoppingMileage {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingMileage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const hasValue = value.value !== null;
  const mileageDisplay = hasValue ? String(value.value) : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow-md">
      {/* Header: Date and Code */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar className="text-gray-500" size={16} />
          <span className="text-sm text-gray-600">{formattedDate}</span>
        </div>
        <span className="text-sm font-medium text-gray-800">{value.code}</span>
      </div>

      {/* Mileage Value with Direction Indicator */}
      <div className="flex items-center mb-2">
        {hasValue ? (
          <>
            {value.direction === 1 ? (
              <LucideReact.ArrowUp className="text-green-500" size={20} strokeWidth={2} />
            ) : (
              <LucideReact.ArrowDown className="text-red-500" size={20} strokeWidth={2} />
            )}
            <span className="ml-2 text-lg font-semibold text-gray-800">
              {mileageDisplay}
            </span>
          </>
        ) : (
          <div className="flex items-center text-gray-400">
            <LucideReact.AlertCircle size={20} />
            <span className="ml-2 text-lg font-semibold">N/A</span>
          </div>
        )}
      </div>

      {/* Source Information */}
      <div className="flex items-center">
        <LucideReact.Tag className="text-gray-400" size={16} />
        <span className="ml-2 text-sm text-gray-600 truncate">{value.source}</span>
      </div>
    </div>
  );
}
