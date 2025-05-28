import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface IShoppingDeposit {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    }
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
    hour: '2-digit',
    minute: '2-digit',
  });
  const directionLabel = value.direction === 1 ? 'Deposit' : 'Withdrawal';
  const directionIcon =
    value.direction === 1 ? (
      <LucideReact.PlusCircle
        className="text-green-500"
        size={16}
        aria-label="Deposit"
      />
    ) : (
      <LucideReact.MinusCircle
        className="text-red-500"
        size={16}
        aria-label="Withdrawal"
      />
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
      {/* Direction */}
      <div className="flex items-center space-x-2">
        {directionIcon}
        <span className="font-semibold text-gray-800">{directionLabel}</span>
      </div>

      {/* Details */}
      <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:space-x-6 text-gray-600 text-sm">
        {/* Code */}
        <div className="flex items-center truncate">
          <LucideReact.Hash
            className="text-gray-400"
            size={16}
            aria-hidden="true"
          />
          <span className="ml-1">{value.code}</span>
        </div>
        {/* Date */}
        <div className="flex items-center mt-2 sm:mt-0">
          <LucideReact.Calendar
            className="text-gray-400"
            size={16}
            aria-hidden="true"
          />
          <span className="ml-1">{formattedDate}</span>
        </div>
        {/* Source */}
        <div className="flex items-center mt-2 sm:mt-0 truncate">
          <LucideReact.Link
            className="text-gray-400"
            size={16}
            aria-hidden="true"
          />
          <span className="ml-1">{value.source}</span>
        </div>
      </div>
    </div>
  );
}
