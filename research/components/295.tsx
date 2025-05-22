import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type SELECT_MORE_THAN_ONE_IMAGE = {
    type: "business";
    result: false;
    code: 4005;
    data: "\uC801\uC5B4\uB3C4 1\uC7A5 \uC774\uC0C1\uC758 \uC774\uBBF8\uC9C0\uB97C \uACE8\uB77C\uC57C \uD569\uB2C8\uB2E4.";
  };
  export type ResponseForm_lt_Array_lt_string_gt__gt_ = {
    result: true;
    code: 1000;
    requestToResponse?: string;
    data: string[];
  };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.SELECT_MORE_THAN_ONE_IMAGE
  | AutoViewInputSubTypes.ResponseForm_lt_Array_lt_string_gt__gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Determine if the payload represents an error or a successful response
  const isError = value.result === false;

  if (isError) {
    // Error case: SELECT_MORE_THAN_ONE_IMAGE
    const { code, data: message } =
      value as AutoViewInputSubTypes.SELECT_MORE_THAN_ONE_IMAGE;

    return (
      <div className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
        <LucideReact.AlertTriangle
          className="text-red-500 flex-shrink-0"
          size={20}
          aria-label="Error"
        />
        <div className="ml-3">
          <p className="text-sm font-semibold text-red-800">Error {code}</p>
          <p className="mt-1 text-sm text-red-700">{message}</p>
        </div>
      </div>
    );
  }

  // Success case: ResponseForm<string[]>
  const {
    code,
    requestToResponse,
    data: items,
  } = value as AutoViewInputSubTypes.ResponseForm_lt_Array_lt_string_gt__gt_;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.MessageSquare className="mr-2" size={16} />
        <span>Response Code: {code}</span>
      </div>

      {requestToResponse && (
        <div className="mt-2 text-sm text-gray-700">
          <span className="font-medium">Request → Response:</span>{" "}
          <span className="italic">{requestToResponse}</span>
        </div>
      )}

      {items.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <LucideReact.CheckCircle
                className="text-green-500 flex-shrink-0 mt-1"
                size={16}
                aria-hidden="true"
              />
              <span className="ml-2 text-gray-800 break-words">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3 flex items-center text-gray-500">
          <LucideReact.AlertCircle size={20} className="mr-2" />
          <span className="text-sm">No items available.</span>
        </div>
      )}
    </div>
  );
}
