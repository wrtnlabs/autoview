import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type ResponseForm_lt_true_gt_ = {
    result: true;
    code: 1000;
    requestToResponse?: string;
    data: true;
  };
  export type ALREADY_FOLLOW_USER = {
    type: "business";
    result: false;
    code: 4008;
    data: "\uC774\uBBF8 \uC88B\uC544\uC694\uB97C \uB204\uB978 \uB514\uC790\uC774\uB108\uB2D8\uC785\uB2C8\uB2E4!";
  };
  export type CANNOT_FIND_ONE_DESIGNER_TO_FOLLOW = {
    type: "business";
    result: false;
    code: 4009;
    data: "\uD314\uB85C\uC6B0\uD560 \uB514\uC790\uC774\uB108\uB2D8\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
  };
  export type CANNOT_FOLLOW_MYSELF = {
    type: "business";
    result: false;
    code: 4017;
    data: "\uC124\uB9C8 \uC790\uAE30 \uC790\uC2E0\uC744 \uD314\uB85C\uC6B0\uD558\uB824\uACE0 \uD588\uC5B4\uC694?!";
  };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.ResponseForm_lt_true_gt_
  | AutoViewInputSubTypes.ALREADY_FOLLOW_USER
  | AutoViewInputSubTypes.CANNOT_FIND_ONE_DESIGNER_TO_FOLLOW
  | AutoViewInputSubTypes.CANNOT_FOLLOW_MYSELF;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isSuccess = value.result === true;
  const icon = isSuccess ? (
    <LucideReact.CheckCircle
      className="text-green-500 flex-shrink-0"
      size={24}
      aria-label="Success"
    />
  ) : (
    <LucideReact.AlertTriangle
      className="text-red-500 flex-shrink-0"
      size={24}
      aria-label="Error"
    />
  );

  const title = isSuccess ? "Operation Successful" : "Error Occurred";

  const message =
    isSuccess && "requestToResponse" in value && value.requestToResponse
      ? value.requestToResponse
      : !isSuccess && typeof value.data === "string"
        ? value.data
        : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full mx-auto p-4 bg-white rounded-lg shadow-md flex items-start space-x-4">
      {icon}
      <div className="flex-1">
        <h2
          className={`text-lg font-semibold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {title}
        </h2>
        {message && (
          <p className="mt-1 text-gray-700 line-clamp-3">{message}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">Code: {value.code}</p>
      </div>
    </div>
  );
}
