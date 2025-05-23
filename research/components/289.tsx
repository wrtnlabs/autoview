import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface CANNOT_FINDONE_ARTICLE {
        type: "business";
        result: false;
        code: 4004;
        data: "\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
    }
    export interface ResponseForm_lt_boolean_gt_ {
        result: true;
        code: 1000;
        requestToResponse?: string;
        data: boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE | AutoViewInputSubTypes.ResponseForm_lt_boolean_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Determine if this is an error or a success response by discriminating on the literal `result`
  const isError = value.result === false;

  if (isError) {
    // Error display for AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE
    const error = value as AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE;
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-3"
      >
        <LucideReact.AlertTriangle
          aria-label="Error"
          size={20}
          className="flex-shrink-0 mt-1 text-red-600"
        />
        <div className="flex-1">
          <h4 className="text-sm font-semibold">Error Code {error.code}</h4>
          <p className="mt-1 text-sm">{error.data}</p>
        </div>
      </div>
    );
  }

  // Success display for AutoViewInputSubTypes.ResponseForm_lt_boolean_gt_
  const success = value as AutoViewInputSubTypes.ResponseForm_lt_boolean_gt_;
  const displayData = success.data ? "True" : "False";

  return (
    <div
      role="status"
      aria-live="polite"
      className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex flex-col md:flex-row md:items-center gap-3"
    >
      <div className="flex items-center gap-2">
        <LucideReact.CheckCircle
          aria-label="Success"
          size={20}
          className="flex-shrink-0 text-green-600"
        />
        <span className="font-medium">Response:</span>
        <span className="font-semibold">{displayData}</span>
      </div>
      {success.requestToResponse && (
        <div
          className="text-gray-600 text-sm truncate md:ml-auto"
          title={success.requestToResponse}
        >
          {success.requestToResponse}
        </div>
      )}
    </div>
  );
}
