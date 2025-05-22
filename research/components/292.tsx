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
  // Determine if the response is an error based on the `result` flag
  const isError = !value.result;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {isError ? (
        // Error state
        <div className="flex items-start gap-3 text-red-600">
          <LucideReact.AlertTriangle size={24} />
          <div className="flex flex-col">
            <span className="font-semibold text-red-700">Error</span>
            <p className="mt-1 text-sm text-red-800">{value.data}</p>
          </div>
        </div>
      ) : (
        // Success state
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-green-600">
            <LucideReact.CheckCircle size={24} />
            <span className="font-semibold text-green-700">Success</span>
          </div>

          {value.requestToResponse && (
            <div className="mt-2 text-gray-700 text-sm">
              <span className="font-medium">Request to Response:</span>{" "}
              <span className="italic">{value.requestToResponse}</span>
            </div>
          )}

          {value.data.length > 0 ? (
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-800">
              {value.data.map((item, idx) => (
                <li key={idx} className="truncate">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-3 flex items-center text-gray-500">
              <LucideReact.AlertCircle size={20} />
              <span className="ml-2">No items to display.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
