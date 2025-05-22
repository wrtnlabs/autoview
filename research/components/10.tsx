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
  const isDeposit = value.direction === 1;
  const directionLabel = isDeposit ? 'Deposit' : 'Withdrawal';
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isDeposit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {directionLabel}
        </span>
        <time dateTime={value.created_at} className="text-sm text-gray-500">
          {formattedDate}
        </time>
      </div>
      <h3 className="text-lg font-medium text-gray-900 truncate">{value.code}</h3>
      <p className="mt-1 text-sm text-gray-600 truncate">Source: {value.source}</p>
    </div>
  );
}
