import LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  const statusLabel = value.result ? "Success" : "Error";
  const StatusIcon = value.result
    ? LucideReact.CheckCircle
    : LucideReact.AlertTriangle;
  const statusColorClass = value.result ? "text-green-500" : "text-red-500";
  const hasAdditional = Boolean(value.requestToResponse);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Status Header */}
      <div className="flex items-center mb-3">
        <StatusIcon className={`mr-2 ${statusColorClass}`} size={20} />
        <h2 className={`text-lg font-semibold ${statusColorClass}`}>
          {statusLabel}
        </h2>
      </div>

      {/* Code Display */}
      <div className="flex items-center text-gray-600 mb-4 text-sm">
        <LucideReact.Code size={16} className="mr-1" />
        <span className="font-medium">Code:</span>
        <span className="ml-1">{value.code}</span>
      </div>

      {/* Optional Request/Response */}
      {hasAdditional && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-800 mb-1">
            Request / Response
          </h3>
          <pre className="max-h-40 overflow-auto bg-gray-100 p-2 rounded text-xs whitespace-pre-wrap">
            {value.requestToResponse}
          </pre>
        </div>
      )}

      {/* Primary Data */}
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-1">Data</h3>
        <p className="text-gray-900 text-sm line-clamp-4 whitespace-pre-wrap">
          {value.data}
        </p>
      </div>
    </div>
  );
}
