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
  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const directionLabel = value.direction === 1 ? 'Credit' : 'Debit';
  const directionClasses =
    value.direction === 1
      ? 'text-green-800 bg-green-100'
      : 'text-red-800 bg-red-100';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Deposit #{value.code}
        </h2>
        <span
          className={`px-2 py-1 text-sm font-medium rounded-full ${directionClasses}`}
        >
          {directionLabel}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">{formattedDate}</p>
      <div className="text-sm text-gray-700">
        <div className="mb-2">
          <span className="font-medium">Source:</span>{' '}
          <span className="truncate">{value.source}</span>
        </div>
      </div>
    </div>
  );
}
