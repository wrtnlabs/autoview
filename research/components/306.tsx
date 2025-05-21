import React from "react";
export namespace AutoViewInputSubTypes {
    export type Try_lt_string_gt_ = {
        result: true;
        code: 1000;
        requestToResponse?: string;
        data: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.Try_lt_string_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isSuccess = value.result === true;
  const statusLabel = isSuccess ? "Success" : "Error";
  const statusClasses = isSuccess
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <span className={`px-2 py-1 text-sm font-medium rounded ${statusClasses}`}>
          {statusLabel}
        </span>
        <span className="text-sm text-gray-500">Code: {value.code}</span>
      </div>
      {value.requestToResponse && (
        <div className="mb-4 text-sm italic text-gray-600">
          {value.requestToResponse}
        </div>
      )}
      <div className="overflow-auto max-h-40 p-2 bg-gray-50 text-sm text-gray-800 rounded whitespace-pre-wrap break-words">
        {value.data}
      </div>
    </div>
  );
}
