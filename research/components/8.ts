import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type IShoppingDeposit = {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDeposit;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const directionLabel = value.direction === 1 ? 'Credit' : 'Debit';
  const directionColorClass =
    value.direction === 1
      ? 'text-green-600 bg-green-100'
      : 'text-red-600 bg-red-100';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md space-y-3">
      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${directionColorClass}`}
        >
          {directionLabel}
        </span>
        <time
          dateTime={value.created_at}
          className="text-gray-500 text-sm"
        >
          {formattedDate}
        </time>
      </div>
      <div className="overflow-hidden">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {value.code}
        </h3>
        <p className="text-sm text-gray-600 truncate">
          Source: {value.source}
        </p>
      </div>
    </div>
  );
}
