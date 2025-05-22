import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived values for display
  const isDeposit = value.direction === 1;
  const transactionLabel = isDeposit ? "Deposit" : "Withdrawal";
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Visual structure
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg shadow-md">
      {/* Transaction type and code */}
      <div className="flex items-center space-x-3">
        {isDeposit ? (
          <LucideReact.ArrowDownCircle className="text-green-500" size={24} />
        ) : (
          <LucideReact.ArrowUpCircle className="text-red-500" size={24} />
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            {transactionLabel}
          </span>
          <span className="text-xs font-mono text-gray-500 truncate">
            {value.code}
          </span>
        </div>
      </div>

      {/* Date and Source */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-3 sm:mt-0 text-sm text-gray-500">
        <div className="flex items-center whitespace-nowrap">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span className="ml-1">{formattedDate}</span>
        </div>
        <div className="flex items-center whitespace-nowrap mt-1 sm:mt-0">
          <LucideReact.Tag className="text-gray-400" size={16} />
          <span className="ml-1">{value.source}</span>
        </div>
      </div>
    </div>
  );
}
