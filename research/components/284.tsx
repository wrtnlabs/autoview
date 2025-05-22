import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type CANNOT_FIND_ONE_COMMENT = {
    type: "business";
    result: false;
    code: 4016;
    data: "\uD574\uB2F9 \uB313\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
  };
  export type ResponseForm_lt_boolean_gt_ = {
    result: true;
    code: 1000;
    requestToResponse?: string;
    data: boolean;
  };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.CANNOT_FIND_ONE_COMMENT
  | AutoViewInputSubTypes.ResponseForm_lt_boolean_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Determine if the payload is an error or a normal boolean response
  const isError = "type" in value && value.type === "business";

  // 2. Choose icon and label based on the payload
  const statusIcon = isError ? (
    <LucideReact.AlertTriangle
      size={20}
      className="text-red-500 flex-shrink-0"
      aria-label="Error"
    />
  ) : value.data ? (
    <LucideReact.CheckCircle
      size={20}
      className="text-green-500 flex-shrink-0"
      aria-label="True"
    />
  ) : (
    <LucideReact.XCircle
      size={20}
      className="text-red-500 flex-shrink-0"
      aria-label="False"
    />
  );

  const statusLabel = isError ? "Error" : "Result";

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        {statusIcon}
        <span className="text-lg font-medium text-gray-900">{statusLabel}</span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {isError
          ? (value as AutoViewInputSubTypes.CANNOT_FIND_ONE_COMMENT).data
          : `Data: ${String(value.data)}`}
      </div>
      <div className="mt-2 text-xs text-gray-400">Code: {value.code}</div>
    </div>
  );
}
