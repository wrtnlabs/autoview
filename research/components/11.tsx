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
  const { created_at, code, source, direction } = value;
  const dateObj = new Date(created_at);
  const formattedDate = dateObj.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const isDeposit = direction === 1;
  const directionLabel = isDeposit ? 'Deposit' : 'Withdrawal';
  const directionIcon = isDeposit
    ? <LucideReact.ArrowDownCircle className="text-green-500" size={20} />
    : <LucideReact.ArrowUpCircle className="text-red-500" size={20} />;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        {directionIcon}
        <h2 className={`text-lg font-semibold ml-2 ${isDeposit ? 'text-green-600' : 'text-red-600'}`}>
          {directionLabel}
        </h2>
      </div>
      <div className="space-y-2 text-gray-700 text-sm">
        <div>
          <span className="font-medium">Code:</span>{' '}
          <span className="font-mono text-gray-800">{code}</span>
        </div>
        <div>
          <span className="font-medium">Source:</span>{' '}
          <span className="text-gray-800">{source}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span className="ml-1">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
