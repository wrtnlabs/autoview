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
  const isDeposit = value.direction === 1;
  const typeLabel = isDeposit ? "Deposit" : "Withdrawal";
  const badgeClasses = isDeposit
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    Return a card that highlights transaction type, date, code, and source.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${badgeClasses}`}>
          {typeLabel}
        </span>
        <time
          className="text-xs text-gray-500"
          dateTime={value.created_at}
        >
          {formattedDate}
        </time>
      </div>
      <dl className="grid grid-cols-1 gap-y-2">
        <div className="flex flex-col">
          <dt className="text-sm font-medium text-gray-600">Transaction Code</dt>
          <dd className="text-sm text-gray-900 truncate">{value.code}</dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-sm font-medium text-gray-600">Source</dt>
          <dd className="text-sm text-gray-900 truncate">{value.source}</dd>
        </div>
      </dl>
    </div>
  );
}
