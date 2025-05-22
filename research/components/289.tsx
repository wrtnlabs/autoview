import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type CANNOT_FINDONE_ARTICLE = {
    type: "business";
    result: false;
    code: 4004;
    data: "\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
  };
  export type ResponseForm_lt_boolean_gt_ = {
    result: true;
    code: 1000;
    requestToResponse?: string;
    data: boolean;
  };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE
  | AutoViewInputSubTypes.ResponseForm_lt_boolean_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { result, code, data } = value;
  const isError = result === false;

  const statusIcon = isError ? (
    <LucideReact.AlertTriangle className="text-red-500" size={20} />
  ) : typeof data === "boolean" ? (
    data ? (
      <LucideReact.CheckCircle className="text-green-500" size={20} />
    ) : (
      <LucideReact.XCircle className="text-red-500" size={20} />
    )
  ) : (
    <LucideReact.CheckCircle className="text-green-500" size={20} />
  );

  const statusText = isError
    ? "Error"
    : typeof data === "boolean"
      ? data
        ? "True"
        : "False"
      : "Info";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        {statusIcon}
        <h2
          className={`text-lg font-semibold ${isError ? "text-red-600" : "text-green-600"}`}
        >
          {statusText}
        </h2>
      </div>
      <div className="mt-2 space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-medium">Code:</span> {code}
        </p>
        <p>
          <span className="font-medium">Message:</span>{" "}
          {typeof data === "string" ? data : data.toString()}
        </p>
        {"requestToResponse" in value && value.requestToResponse && (
          <p>
            <span className="font-medium">Response:</span>{" "}
            {value.requestToResponse}
          </p>
        )}
      </div>
    </div>
  );
}
