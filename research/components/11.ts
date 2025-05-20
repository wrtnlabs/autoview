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
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const typeLabel = value.direction === 1 ? "Deposit" : "Withdrawal";
  const badgeClasses =
    value.direction === 1
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <time dateTime={value.created_at} className="text-sm text-gray-500">
          {formattedDate}
        </time>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${badgeClasses}`}
        >
          {typeLabel}
        </span>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-700">Reference</h3>
        <p className="mt-1 text-sm text-gray-800 break-all">{value.code}</p>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-700">Source</h3>
        <p className="mt-1 text-sm text-gray-800 truncate">{value.source}</p>
      </div>
    </div>
  );
}
