import { tags } from "typia";
import React from "react";
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
  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  let amountText: string;
  let amountClass: string;
  if (value.value === null) {
    amountText = '-';
    amountClass = 'text-gray-500';
  } else {
    const sign = value.direction === 1 ? '+' : '-';
    amountText = `${sign}${value.value}`;
    amountClass = value.direction === 1 ? 'text-green-600' : 'text-red-600';
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-4 mobile-first">
      <div className="flex items-center justify-between">
        <span className={`text-lg font-semibold ${amountClass}`}>{amountText}</span>
        <time className="text-sm text-gray-500" dateTime={value.created_at}>
          {formattedDate}
        </time>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Transaction Code:</span> {value.code}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Source:</span> {value.source}
        </p>
      </div>
    </div>
  );
}
