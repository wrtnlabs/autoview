import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface Try_lt_string_gt_ {
        result: true;
        code: 1000;
        requestToResponse?: string;
        data: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.Try_lt_string_gt_;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Destructure and derive display values
  const { result, code, requestToResponse, data } = value;
  const statusText = result ? "Success" : "Failure";
  const statusIcon = result
    ? <LucideReact.CheckCircle className="text-green-500" size={16} />
    : <LucideReact.XCircle className="text-red-500" size={16} />;

  // 2. Compose the visual structure
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        {statusIcon}
        <span className="ml-2 font-semibold text-gray-800">{statusText}</span>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <span className="font-medium">Code:</span> {code}
      </div>

      {requestToResponse && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700">Request / Response</div>
          <p className="mt-1 text-gray-600 line-clamp-3 overflow-hidden">
            {requestToResponse}
          </p>
        </div>
      )}

      <div>
        <div className="text-sm font-medium text-gray-700">Data</div>
        <p className="mt-1 text-gray-800 line-clamp-3 overflow-hidden">
          {data}
        </p>
      </div>
    </div>
  );
}
