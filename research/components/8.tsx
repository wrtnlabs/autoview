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
  // 1. Define data aggregation/transformation functions or derived constants
  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const type = value.direction === 1 ? 'Credit' : 'Debit';
  const typeClass =
    value.direction === 1
      ? 'text-green-700 bg-green-100'
      : 'text-red-700 bg-red-100';

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 break-words">
            {value.code}
          </h2>
          <p className="mt-1 text-sm text-gray-500">Source: {value.source}</p>
          <p className="mt-1 text-sm text-gray-500">Date: {formattedDate}</p>
        </div>
        <span
          className={`mt-2 sm:mt-0 sm:ml-4 inline-block px-2 py-1 text-xs font-semibold rounded ${typeClass}`}
        >
          {type}
        </span>
      </div>
    </div>
  );
}
