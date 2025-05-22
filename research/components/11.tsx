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
  // 1. Define data aggregation/transformation functions or derived constants
  const { created_at, code, source, direction } = value;
  const date = new Date(created_at);
  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isDeposit = direction === 1;
  const directionLabel = isDeposit ? "Deposit" : "Withdrawal";
  const IconComponent = isDeposit ? LucideReact.ArrowUp : LucideReact.ArrowDown;
  const iconColorClass = isDeposit ? "text-green-500" : "text-red-500";
  const iconBgClass = isDeposit ? "bg-green-100" : "bg-red-100";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full ${iconBgClass}`}
      >
        <IconComponent className={iconColorClass} size={20} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0 px-4">
        <div className="text-sm font-medium text-gray-900 truncate">{code}</div>
        <div className="mt-1 text-sm text-gray-500 truncate">{source}</div>
      </div>
      <div className="text-right whitespace-nowrap">
        <div className={`text-sm font-semibold ${iconColorClass}`}>
          {directionLabel}
        </div>
        <div className="mt-1 text-xs text-gray-400">{formattedDate}</div>
      </div>
    </div>
  );
}
