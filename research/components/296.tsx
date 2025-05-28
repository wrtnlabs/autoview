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
  const isError = !value.result;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (isError) {
    // Error case: SELECT_MORE_THAN_ONE_IMAGE
    const error = value as AutoViewInputSubTypes.SELECT_MORE_THAN_ONE_IMAGE;
    return (
      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start space-x-3">
        <LucideReact.AlertTriangle className="flex-shrink-0 text-red-500" size={20} />
        <div>
          <p className="text-sm font-semibold text-red-700">Error {error.code}</p>
          <p className="mt-1 text-sm text-red-600">{error.data}</p>
        </div>
      </div>
    );
  }

  // Success case: ResponseForm_lt_Array_lt_string_gt__gt_
  const response = value as AutoViewInputSubTypes.ResponseForm_lt_Array_lt_string_gt__gt_;
  const items = response.data;
  const count = items.length;
  const headerText = response.requestToResponse
    ? response.requestToResponse
    : `${count} item${count !== 1 ? "s" : ""}`;

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-3">
        <LucideReact.CheckCircle className="text-green-500 mr-2" size={20} />
        <h3 className="text-base font-semibold text-gray-800">{headerText}</h3>
      </div>
      {count > 0 ? (
        <ul className="list-disc list-inside space-y-2 max-h-48 overflow-y-auto">
          {items.map((item, idx) => (
            <li key={idx} className="text-gray-700 truncate">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center text-gray-500 text-sm">
          <LucideReact.AlertCircle className="mr-1" size={16} />
          <span>No items available.</span>
        </div>
      )}
    </div>
  );
}
