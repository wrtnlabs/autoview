import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface CANNOT_FINDONE_ARTICLE {
        type: "business";
        result: false;
        code: 4004;
        data: "\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
    }
    export interface ARLEADY_REPORTED_ARTICLE {
        type: "business";
        result: false;
        code: 4014;
        data: "\uC774\uBBF8 \uC2E0\uACE0\uD55C \uAC8C\uC2DC\uAE00\uC785\uB2C8\uB2E4.";
    }
    export interface ResponseForm_lt_true_gt_ {
        result: true;
        code: 1000;
        requestToResponse?: string;
        data: true;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE | AutoViewInputSubTypes.ARLEADY_REPORTED_ARTICLE | AutoViewInputSubTypes.ResponseForm_lt_true_gt_;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const isSuccess = value.result;
  const statusIcon = isSuccess ? (
    <LucideReact.CheckCircle
      className="text-green-500"
      size={24}
      aria-label="Success"
    />
  ) : (
    <LucideReact.AlertTriangle
      className="text-red-500"
      size={24}
      aria-label="Error"
    />
  );
  const statusText = isSuccess ? "Success" : "Error";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex items-center space-x-2 mb-3">
        {statusIcon}
        <h2
          className={`text-lg font-semibold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {statusText}
        </h2>
      </div>
      <div className="text-sm text-gray-700 space-y-2">
        <div className="flex items-center">
          <span className="font-medium mr-1">Code:</span>
          <span>{value.code}</span>
        </div>
        {!isSuccess && (
          <div className="text-gray-800 leading-relaxed">
            <span className="font-medium">Message: </span>
            <span className="break-all">{value.data}</span>
          </div>
        )}
        {isSuccess && (
          <>
            {typeof value.requestToResponse === "string" && (
              <div className="flex items-start">
                <span className="font-medium mr-1">Mapping:</span>
                <span className="break-all">{value.requestToResponse}</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="font-medium mr-1">Data:</span>
              <span>{String(value.data)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
