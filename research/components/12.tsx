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



// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const isEarned = value.direction === 1;
  const rawAmount = value.value;
  const amountDisplay =
    rawAmount !== null
      ? `${isEarned ? "+" : "-"}${Math.abs(rawAmount)} mi`
      : "N/A";
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  const card = (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <span className="text-gray-800 font-medium truncate">
          {value.source}
        </span>
        <span
          className={`text-lg font-semibold ${
            isEarned ? "text-green-600" : "text-red-600"
          }`}
        >
          {amountDisplay}
        </span>
      </div>
      <div className="mt-1 flex justify-between items-center text-sm text-gray-500">
        <span className="truncate">{value.code}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );

  // 3. Return the React element
  return card;
}
