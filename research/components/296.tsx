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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isError = !value.result;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (isError) {
    // Error case: SELECT_MORE_THAN_ONE_IMAGE
    const { data, code } =
      value as AutoViewInputSubTypes.SELECT_MORE_THAN_ONE_IMAGE;
    return (
      <div className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
        <LucideReact.AlertTriangle
          className="text-red-500 flex-shrink-0"
          size={20}
        />
        <div className="ml-3">
          <p className="text-red-700 text-sm">{data}</p>
          <p className="mt-1 text-red-500 text-xs">Error code: {code}</p>
        </div>
      </div>
    );
  }

  // Success case: ResponseForm<Array<string>>
  const success =
    value as AutoViewInputSubTypes.ResponseForm_lt_Array_lt_string_gt__gt_;
  const itemsCount = success.data.length;

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-3 text-gray-700">
        <LucideReact.CheckCircle
          className="text-green-500 flex-shrink-0"
          size={20}
        />
        <h3 className="ml-2 text-sm font-medium">
          Response{itemsCount > 0 ? ` (${itemsCount})` : ""}
        </h3>
      </div>
      {success.requestToResponse && (
        <div className="flex items-center mb-2 text-gray-500 text-sm">
          <LucideReact.Link className="text-gray-400 flex-shrink-0" size={16} />
          <span className="ml-1 truncate">{success.requestToResponse}</span>
        </div>
      )}
      {itemsCount > 0 ? (
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {success.data.map((item, idx) => (
            <li key={idx} className="truncate">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle
            className="text-gray-400 flex-shrink-0"
            size={20}
          />
          <span className="ml-2 text-sm">No items available.</span>
        </div>
      )}
    </div>
  );
}
