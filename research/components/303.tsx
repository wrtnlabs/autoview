import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface ResponseForm_lt_true_gt_ {
        result: true;
        code: 1000;
        requestToResponse?: string;
        data: true;
    }
    export interface STILL_UNFOLLOW_USER {
        type: "business";
        result: false;
        code: 4010;
        data: "\uC544\uC9C1 \uD314\uB85C\uC6B0\uD55C \uC801 \uC5C6\uB294 \uB514\uC790\uC774\uB108\uB2D8\uC5D0\uC694!";
    }
    export interface CANNOT_FIND_ONE_DESIGNER_TO_UNFOLLOW {
        type: "business";
        result: false;
        code: 4011;
        data: "\uC5B8\uD314\uB85C\uC6B0\uD560 \uB514\uC790\uC774\uB108\uB2D8\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
    }
}
export type AutoViewInput = AutoViewInputSubTypes.ResponseForm_lt_true_gt_ | AutoViewInputSubTypes.STILL_UNFOLLOW_USER | AutoViewInputSubTypes.CANNOT_FIND_ONE_DESIGNER_TO_UNFOLLOW;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isSuccess = value.result;
  const code = value.code;
  // If successful, show requestToResponse or fallback message. If error, show the error message.
  const message = isSuccess
    ? (value.requestToResponse ?? "Operation completed successfully.")
    : value.data;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-3">
        {isSuccess ? (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={20}
            strokeWidth={1.5}
            aria-label="Success"
          />
        ) : (
          <LucideReact.AlertTriangle
            className="text-red-500"
            size={20}
            strokeWidth={1.5}
            aria-label="Error"
          />
        )}
        <span
          className={
            "ml-2 font-semibold " +
            (isSuccess ? "text-green-600" : "text-red-600")
          }
        >
          {isSuccess ? "Success" : "Error"}
        </span>
        <span className="ml-auto text-xs text-gray-500">Code: {code}</span>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
    </div>
  );
}
