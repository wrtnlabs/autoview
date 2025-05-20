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
  const { value: miles, direction, code, source, created_at } = value;
  const displayPoints = miles ?? 0;
  const sign = direction === 1 ? '+' : '-';
  const formattedPoints = displayPoints.toLocaleString();
  const formattedDate = new Date(created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const valueClass = direction === 1 ? 'text-green-600' : 'text-red-600';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-xs w-full bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{code}</h3>
        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
          {source}
        </span>
      </div>
      <div className="flex items-baseline space-x-1">
        <span className={`${valueClass} text-2xl font-bold`}>
          {sign}
          {formattedPoints}
        </span>
        <span className="text-sm text-gray-500">pts</span>
      </div>
      <time dateTime={created_at} className="self-end text-xs text-gray-400">
        {formattedDate}
      </time>
    </div>
  );
}
