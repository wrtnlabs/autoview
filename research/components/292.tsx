import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface SELECT_MORE_THAN_ONE_IMAGE {
        type: "business";
        result: false;
        code: 4005;
        data: "\uC801\uC5B4\uB3C4 1\uC7A5 \uC774\uC0C1\uC758 \uC774\uBBF8\uC9C0\uB97C \uACE8\uB77C\uC57C \uD569\uB2C8\uB2E4.";
    }
    export interface ResponseForm_lt_Array_lt_string_gt__gt_ {
        result: true;
        code: 1000;
        requestToResponse?: string;
        data: string[];
    }
}
export type AutoViewInput = AutoViewInputSubTypes.SELECT_MORE_THAN_ONE_IMAGE | AutoViewInputSubTypes.ResponseForm_lt_Array_lt_string_gt__gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isError = value.result === false;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (isError) {
    const error = value as AutoViewInputSubTypes.SELECT_MORE_THAN_ONE_IMAGE;
    return (
      <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start space-x-3">
        <LucideReact.AlertTriangle className="mt-1 flex-shrink-0" size={20} />
        <div>
          <div className="font-semibold">Error {error.code}</div>
          <div className="mt-1 text-sm">{error.data}</div>
        </div>
      </div>
    );
  }

  const success = value as AutoViewInputSubTypes.ResponseForm_lt_Array_lt_string_gt__gt_;
  const count = success.data.length;
  const heading = success.requestToResponse
    ? `Response (${count}) for "${success.requestToResponse}"`
    : `Response (${count})`;

  return (
    <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md">
      <div className="flex items-center space-x-2">
        <LucideReact.CheckCircle size={20} className="flex-shrink-0" />
        <span className="font-semibold">{heading}</span>
      </div>
      {count > 0 ? (
        <ul className="mt-2 list-disc list-inside space-y-1">
          {success.data.map((item, idx) => (
            <li key={idx} className="text-sm text-gray-800 truncate">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-2 text-sm text-gray-600 italic">No data available.</div>
      )}
    </div>
  );
}
