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
  // Determine if the input is an error (SELECT_MORE_THAN_ONE_IMAGE) or a successful response
  const isError = !value.result;

  // 1. Error display for SELECT_MORE_THAN_ONE_IMAGE
  if (isError) {
    const errorData = value as AutoViewInputSubTypes.SELECT_MORE_THAN_ONE_IMAGE;
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
        <LucideReact.AlertTriangle className="text-red-500" size={24} />
        <div className="flex-1">
          <h3 className="text-red-800 font-semibold mb-1">Error Code {errorData.code}</h3>
          <p className="text-red-700">{errorData.data}</p>
        </div>
      </div>
    );
  }

  // 2. Success display for ResponseForm<Array<string>>
  const successData = value as AutoViewInputSubTypes.ResponseForm_lt_Array_lt_string_gt__gt_;
  const hasResponses = Array.isArray(successData.data) && successData.data.length > 0;

  return (
    <div className="p-4 bg-white border border-green-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <LucideReact.CheckCircle className="text-green-500" size={20} />
        <h3 className="text-green-800 font-semibold">Responses</h3>
      </div>

      {successData.requestToResponse && (
        <div className="flex items-center text-gray-600 mb-3">
          <LucideReact.ArrowRight size={16} className="mr-1 text-gray-400" />
          <span className="truncate">{successData.requestToResponse}</span>
        </div>
      )}

      {hasResponses ? (
        <ul className="list-disc list-inside space-y-2">
          {successData.data.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <LucideReact.ChevronRight size={16} className="text-gray-400 mt-[3px]" />
              <span className="text-gray-700 truncate">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center text-gray-500 gap-2">
          <LucideReact.AlertCircle size={20} />
          <span>No responses available.</span>
        </div>
      )}
    </div>
  );
}
