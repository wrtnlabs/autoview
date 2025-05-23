import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface CANNOT_FIND_ONE_COMMENT {
        type: "business";
        result: false;
        code: 4016;
        data: "\uD574\uB2F9 \uB313\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
    }
    export interface ResponseForm_lt_boolean_gt_ {
        result: true;
        code: 1000;
        requestToResponse?: string;
        data: boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.CANNOT_FIND_ONE_COMMENT | AutoViewInputSubTypes.ResponseForm_lt_boolean_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Type guard for the error subtype
  const isError = (v: AutoViewInput): v is AutoViewInputSubTypes.CANNOT_FIND_ONE_COMMENT =>
    'type' in v && v.type === 'business' && v.result === false;

  // For the boolean response subtype
  const isResponse = (v: AutoViewInput): v is AutoViewInputSubTypes.ResponseForm_lt_boolean_gt_ =>
    !('type' in v) && typeof v.data === 'boolean';

  // Derived constants for ResponseForm_lt_boolean_gt_
  let statusIcon: React.ReactNode = null;
  let statusText: string = '';
  if (isResponse(value)) {
    statusIcon = value.data
      ? <LucideReact.CheckCircle className="text-green-500" size={20} />
      : <LucideReact.XCircle className="text-red-500" size={20} />;
    statusText = value.data ? 'True' : 'False';
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  if (isError(value)) {
    return (
      <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-md max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <LucideReact.AlertTriangle className="text-red-500" size={20} />
          <span className="text-red-800 font-semibold">Error {value.code}</span>
        </div>
        <p className="mt-2 text-red-700 text-sm">{value.data}</p>
      </div>
    );
  }

  if (isResponse(value)) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Code:</span>
          <span className="text-sm font-medium text-gray-700">{value.code}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          {statusIcon}
          <span className="text-lg font-semibold text-gray-800">{statusText}</span>
        </div>
        {value.requestToResponse && (
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Mapping:</span> {value.requestToResponse}
          </div>
        )}
      </div>
    );
  }

  // Fallback for unexpected shape (shouldn't happen)
  return null;
}
