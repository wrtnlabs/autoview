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
  const mileage = value.value;
  const signSymbol = value.direction === 1 ? '+' : '−';
  const displayValue = mileage !== null ? `${signSymbol}${mileage}` : 'N/A';
  const dateObj = new Date(value.created_at);
  const formattedDate = dateObj.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const directionIcon =
    value.direction === 1 ? (
      <LucideReact.ArrowUpCircle size={20} className="text-green-500 flex-shrink-0" />
    ) : (
      <LucideReact.ArrowDownCircle size={20} className="text-red-500 flex-shrink-0" />
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-xs w-full">
      {/* Mileage Amount */}
      <div className="flex items-center">
        {directionIcon}
        <span
          className={`ml-2 text-lg font-semibold ${
            mileage === null ? 'text-gray-400' : 'text-gray-900'
          }`}
        >
          {displayValue}
        </span>
      </div>
      {/* Details: Date, Code, Source */}
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Code size={16} className="mr-1" />
          <span className="truncate">{value.code}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Link size={16} className="mr-1" />
          <span className="truncate">{value.source}</span>
        </div>
      </div>
    </div>
  );
}
