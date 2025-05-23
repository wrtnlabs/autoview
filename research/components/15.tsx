import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface IShoppingMileage {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingMileage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const miles = value.value;
  const formattedValue =
    miles !== null
      ? new Intl.NumberFormat(undefined).format(Math.abs(miles))
      : null;
  const statusLabel = value.direction === 1 ? "Earned" : "Redeemed";
  const StatusIcon =
    value.direction === 1 ? LucideReact.ArrowUp : LucideReact.ArrowDown;
  const statusColor = value.direction === 1 ? "green" : "red";
  const formattedDate = (() => {
    try {
      return new Date(value.created_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return value.created_at;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <StatusIcon
            size={20}
            className={`text-${statusColor}-500`}
            strokeWidth={2}
          />
          <span className="text-2xl font-semibold text-gray-900">
            {formattedValue !== null ? `${formattedValue} mi` : "—"}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-sm font-medium bg-${statusColor}-100 text-${statusColor}-800`}
        >
          {statusLabel}
        </span>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-600">
        <div>
          <dt className="font-medium">Date</dt>
          <dd>{formattedDate}</dd>
        </div>
        <div>
          <dt className="font-medium">Source</dt>
          <dd className="truncate">{value.source}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-medium">Code</dt>
          <dd className="font-mono text-gray-800 truncate">{value.code}</dd>
        </div>
      </dl>
    </div>
  );
}
