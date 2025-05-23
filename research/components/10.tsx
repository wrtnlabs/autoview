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
  const isDeposit = value.direction === 1;
  const displayType = isDeposit ? "Deposit" : "Withdrawal";
  const IconComponent = isDeposit
    ? LucideReact.ArrowDownCircle
    : LucideReact.ArrowUpCircle;
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const content = (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-start space-x-4">
      <IconComponent
        className={
          isDeposit
            ? "text-green-500 flex-shrink-0"
            : "text-red-500 flex-shrink-0"
        }
        size={24}
      />
      <div className="flex-1">
        <div className="text-lg font-semibold text-gray-900">
          {displayType}
        </div>
        <div className="mt-1 text-sm text-gray-700">
          <span className="font-medium">Code:</span> {value.code}
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <LucideReact.Link size={16} className="mr-1" />
          <span>{value.source}</span>
        </div>
      </div>
    </div>
  );

  // 3. Return the React element.
  return content;
}
