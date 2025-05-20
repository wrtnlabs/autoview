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
    dateStyle: "medium",
    timeStyle: "short",
  });
  const directionLabel = value.direction === 1 ? "Deposit" : "Withdrawal";
  const directionColor =
    value.direction === 1
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 text-sm font-semibold rounded ${directionColor}`}
        >
          {directionLabel}
        </span>
        <time
          dateTime={value.created_at}
          className="text-sm text-gray-500"
        >
          {formattedDate}
        </time>
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Transaction Code</h3>
          <p className="mt-1 text-gray-900 truncate">{value.code}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Source</h3>
          <p className="mt-1 text-gray-900 truncate">{value.source}</p>
        </div>
      </div>
    </div>
  );
}
