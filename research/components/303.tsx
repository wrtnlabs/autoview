import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type ResponseForm_lt_true_gt_ = {
    result: true;
    code: 1000;
    requestToResponse?: string;
    data: true;
  };
  export type STILL_UNFOLLOW_USER = {
    type: "business";
    result: false;
    code: 4010;
    data: "\uC544\uC9C1 \uD314\uB85C\uC6B0\uD55C \uC801 \uC5C6\uB294 \uB514\uC790\uC774\uB108\uB2D8\uC5D0\uC694!";
  };
  export type CANNOT_FIND_ONE_DESIGNER_TO_UNFOLLOW = {
    type: "business";
    result: false;
    code: 4011;
    data: "\uC5B8\uD314\uB85C\uC6B0\uD560 \uB514\uC790\uC774\uB108\uB2D8\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
  };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.ResponseForm_lt_true_gt_
  | AutoViewInputSubTypes.STILL_UNFOLLOW_USER
  | AutoViewInputSubTypes.CANNOT_FIND_ONE_DESIGNER_TO_UNFOLLOW;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isSuccess = value.result === true;
  const statusLabel = isSuccess ? "Success" : "Error";
  const StatusIcon = isSuccess
    ? LucideReact.CheckCircle
    : LucideReact.AlertTriangle;
  const iconColor = isSuccess ? "text-green-500" : "text-red-500";
  const formattedCode = `Code: ${value.code}`;
  const message = isSuccess
    ? (value.requestToResponse ?? "Operation completed successfully.")
    : value.data;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-start space-x-3">
      <StatusIcon
        className={`${iconColor}`}
        size={24}
        strokeWidth={2}
        aria-label={statusLabel}
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h3
            className={`text-lg font-medium ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {statusLabel}
          </h3>
          <span className="text-sm text-gray-500">{formattedCode}</span>
        </div>
        <p className="mt-1 text-sm text-gray-700 break-words">{message}</p>
      </div>
    </div>
  );
}
