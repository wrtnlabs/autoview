import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface IShoppingDepositChargePublish {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        paid_at: null | (string & tags.Format<"date-time">);
        cancelled_at: null | (string & tags.Format<"date-time">);
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDepositChargePublish;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const status = value.cancelled_at
    ? "Cancelled"
    : value.paid_at
    ? "Paid"
    : "Pending";

  const statusIcon = value.cancelled_at ? (
    <LucideReact.XCircle aria-hidden="true" className="text-red-500" size={16} />
  ) : value.paid_at ? (
    <LucideReact.CheckCircle aria-hidden="true" className="text-green-500" size={16} />
  ) : (
    <LucideReact.Clock aria-hidden="true" className="text-amber-500" size={16} />
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const createdAt = formatDate(value.created_at);
  const paidAt = value.paid_at ? formatDate(value.paid_at) : null;
  const cancelledAt = value.cancelled_at ? formatDate(value.cancelled_at) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-sm">
      {/* Status Header */}
      <div className="flex items-center space-x-2 mb-3">
        {statusIcon}
        <span className="text-sm font-semibold text-gray-800">{status}</span>
      </div>

      {/* Dates */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar aria-hidden="true" className="text-gray-400" size={16} />
          <time dateTime={value.created_at}>Created: {createdAt}</time>
        </div>
        {paidAt && (
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar aria-hidden="true" className="text-gray-400" size={16} />
            <time dateTime={value.paid_at!}>Paid: {paidAt}</time>
          </div>
        )}
        {cancelledAt && (
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar aria-hidden="true" className="text-gray-400" size={16} />
            <time dateTime={value.cancelled_at!}>Cancelled: {cancelledAt}</time>
          </div>
        )}
      </div>
    </div>
  );
}
