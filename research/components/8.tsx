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

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation
  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const isCredit = value.direction === 1;
  const directionLabel = isCredit ? "Credit" : "Debit";
  const DirectionIcon = isCredit
    ? LucideReact.ArrowUpRight
    : LucideReact.ArrowDownLeft;

  // 2. Visual structure
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-gray-600 text-sm">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
        <div
          className={`flex items-center text-sm font-medium ${
            isCredit ? "text-green-600" : "text-red-600"
          }`}
        >
          <DirectionIcon size={16} className="mr-1" />
          <span>{directionLabel}</span>
        </div>
      </div>
      <div className="text-gray-800 space-y-2">
        <div className="flex items-center">
          <span className="font-semibold w-16">Code:</span>
          <span className="truncate">{value.code}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-16">Source:</span>
          <span className="truncate">{value.source}</span>
        </div>
      </div>
    </div>
  );
}
