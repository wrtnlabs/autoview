import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type CANNOT_FINDONE_ARTICLE = {
    type: "business";
    result: false;
    code: 4004;
    data: "\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
  };
  export type ARLEADY_REPORTED_ARTICLE = {
    type: "business";
    result: false;
    code: 4014;
    data: "\uC774\uBBF8 \uC2E0\uACE0\uD55C \uAC8C\uC2DC\uAE00\uC785\uB2C8\uB2E4.";
  };
  export type ResponseForm_lt_true_gt_ = {
    result: true;
    code: 1000;
    requestToResponse?: string;
    data: true;
  };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE
  | AutoViewInputSubTypes.ARLEADY_REPORTED_ARTICLE
  | AutoViewInputSubTypes.ResponseForm_lt_true_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isSuccess = value.result === true;
  const statusMessage = isSuccess
    ? (value.requestToResponse ?? "Operation completed successfully.")
    : value.data;
  const code = value.code;
  const Icon = isSuccess ? LucideReact.CheckCircle : LucideReact.AlertTriangle;
  const containerClasses = isSuccess
    ? "max-w-md w-full mx-auto p-4 bg-white border-l-4 border-green-500 rounded-r-lg shadow-sm flex items-start gap-3"
    : "max-w-md w-full mx-auto p-4 bg-white border-l-4 border-red-500 rounded-r-lg shadow-sm flex items-start gap-3";
  const iconClasses = isSuccess ? "text-green-500" : "text-red-500";
  const textClasses = isSuccess ? "text-green-700" : "text-red-700";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className={containerClasses}>
      <Icon
        size={24}
        strokeWidth={1.5}
        className={iconClasses}
        aria-label={isSuccess ? "Success" : "Error"}
      />
      <div className="flex-1">
        <p className={`font-semibold ${textClasses} truncate`}>
          {statusMessage}
        </p>
        <p className="mt-1 text-sm text-gray-500">Code: {code}</p>
      </div>
    </div>
  );
}
