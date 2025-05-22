import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const createdDate = new Date(value.created_at).toLocaleString();
  const paidDate = value.paid_at
    ? new Date(value.paid_at).toLocaleString()
    : null;
  const cancelledDate = value.cancelled_at
    ? new Date(value.cancelled_at).toLocaleString()
    : null;

  type StatusType = "Pending" | "Paid" | "Cancelled";
  let status: StatusType = "Pending";
  if (paidDate) status = "Paid";
  else if (cancelledDate) status = "Cancelled";

  let StatusIcon: JSX.Element;
  let statusColorClass: string;
  switch (status) {
    case "Paid":
      StatusIcon = (
        <LucideReact.CheckCircle className="text-green-500 ml-1" size={16} />
      );
      statusColorClass = "text-green-600";
      break;
    case "Cancelled":
      StatusIcon = (
        <LucideReact.AlertTriangle className="text-red-500 ml-1" size={16} />
      );
      statusColorClass = "text-red-600";
      break;
    default:
      StatusIcon = (
        <LucideReact.Clock className="text-amber-500 ml-1" size={16} />
      );
      statusColorClass = "text-amber-600";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full text-gray-800">
      <div className="flex items-center mb-3">
        <LucideReact.Calendar className="text-gray-400 mr-2" size={16} />
        <span className="text-sm">
          Created: <span className="font-medium">{createdDate}</span>
        </span>
      </div>
      <div className="flex items-center mb-3">
        {status === "Paid" ? (
          <LucideReact.CheckCircle className="text-green-500 mr-2" size={16} />
        ) : (
          <LucideReact.CheckCircle className="text-gray-300 mr-2" size={16} />
        )}
        <span className="text-sm">
          Paid: <span className="font-medium">{paidDate ?? "—"}</span>
        </span>
      </div>
      <div className="flex items-center mb-3">
        {status === "Cancelled" ? (
          <LucideReact.XCircle className="text-red-500 mr-2" size={16} />
        ) : (
          <LucideReact.XCircle className="text-gray-300 mr-2" size={16} />
        )}
        <span className="text-sm">
          Cancelled: <span className="font-medium">{cancelledDate ?? "—"}</span>
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-sm font-medium">Status:</span>
        <span className={`ml-2 text-sm font-semibold ${statusColorClass}`}>
          {status}
        </span>
        {StatusIcon}
      </div>
    </div>
  );
}
