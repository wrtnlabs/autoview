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
  const points = value.value ?? 0;
  const isPositive = value.direction === 1;
  const sign = isPositive ? '+' : '-';
  const displayPoints = `${sign}${Math.abs(points).toLocaleString()} points`;
  const statusLabel = isPositive ? 'Earned' : 'Redeemed';
  const dateObj = new Date(value.created_at);
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <time dateTime={value.created_at} className="text-sm text-gray-500">
          {formattedDate}
        </time>
        <span
          className={`text-sm font-bold ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {displayPoints}
        </span>
      </div>
      <div className="space-y-2">
        <div className="text-lg font-semibold text-gray-800">{statusLabel}</div>
        <div className="flex flex-wrap text-sm text-gray-600 gap-x-4">
          <div className="flex-shrink-0">
            <span className="font-medium">Code:</span>{' '}
            <span className="font-mono text-gray-700 truncate">{value.code}</span>
          </div>
          <div className="flex-shrink-0">
            <span className="font-medium">Source:</span>{' '}
            <span className="capitalize text-gray-700">{value.source}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
