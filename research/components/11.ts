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
  const { code, source, direction, created_at } = value;
  const date = new Date(created_at);
  const formattedDate =
    date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) +
    ' ' +
    date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  const typeLabel = direction === 1 ? 'Deposit' : 'Withdrawal';
  const badgeClasses =
    direction === 1
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{code}</h2>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${badgeClasses}`}
        >
          {typeLabel}
        </span>
      </div>
      <div className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Source:</span>{' '}
        <span className="text-gray-800 truncate">{source}</span>
      </div>
      <div className="text-sm text-gray-600">
        <span className="font-medium">Date:</span>{' '}
        <span className="text-gray-800">{formattedDate}</span>
      </div>
    </div>
  );
}
