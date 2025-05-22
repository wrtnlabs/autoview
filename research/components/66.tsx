import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type IShoppingDepositChargePublish = {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        paid_at: null | (string & tags.Format<"date-time">);
        cancelled_at: null | (string & tags.Format<"date-time">);
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDepositChargePublish;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Determine current status based on paid_at and cancelled_at fields.
  const status = value.paid_at
    ? "Paid"
    : value.cancelled_at
    ? "Cancelled"
    : "Pending";

  // Map status to Tailwind CSS badge styles
  const statusStyles: Record<string, string> = {
    Paid: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  // Format dates into a readable form
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const formattedCreatedAt = formatDate(value.created_at);
  const formattedPaidAt = value.paid_at ? formatDate(value.paid_at) : null;
  const formattedCancelledAt = value.cancelled_at
    ? formatDate(value.cancelled_at)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      {/* Header with title and status badge */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Deposit Charge
        </h2>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Details section */}
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <div>
          <span className="font-medium">Created:</span>{" "}
          <span>{formattedCreatedAt}</span>
        </div>
        {formattedPaidAt && (
          <div>
            <span className="font-medium">Paid at:</span>{" "}
            <span>{formattedPaidAt}</span>
          </div>
        )}
        {formattedCancelledAt && (
          <div>
            <span className="font-medium">Cancelled at:</span>{" "}
            <span>{formattedCancelledAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
