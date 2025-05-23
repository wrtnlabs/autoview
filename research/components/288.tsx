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
    export interface IS_NOT_WRITER_OF_THIS_ARTICLE {
        type: "business";
        result: false;
        code: 4015;
        data: "\uC774 \uAC8C\uC2DC\uAE00\uC758 \uC791\uC131\uC790\uB9CC\uC774 \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.";
    }
}
export type AutoViewInput = AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE | AutoViewInputSubTypes.ResponseForm_lt_boolean_gt_ | AutoViewInputSubTypes.IS_NOT_WRITER_OF_THIS_ARTICLE;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Determine variant and prepare display data
  const isSuccess = value.result === true;

  // Shared UI pieces
  let icon: JSX.Element;
  let title: string;
  let details: JSX.Element;

  if (isSuccess) {
    // Success variant: ResponseForm_lt_boolean_gt_
    const { data, requestToResponse, code } = value as AutoViewInputSubTypes.ResponseForm_lt_boolean_gt_;
    icon = <LucideReact.CheckCircle className="text-green-500" size={24} />;
    title = "Success";
    details = (
      <div className="mt-2 space-y-1">
        <div className="flex items-center text-gray-700">
          <span className="font-medium">Value:</span>
          {data ? (
            <LucideReact.CheckCircle className="ml-2 text-green-500" size={16} aria-label="true" />
          ) : (
            <LucideReact.XCircle className="ml-2 text-red-500" size={16} aria-label="false" />
          )}
        </div>
        {requestToResponse && (
          <div className="flex items-start text-gray-700">
            <span className="font-medium mr-1">Message:</span>
            <span className="flex-1 break-all">{requestToResponse}</span>
          </div>
        )}
        <div className="text-sm text-gray-500">Code: {code}</div>
      </div>
    );
  } else {
    // Error variants: CANNOT_FINDONE_ARTICLE or IS_NOT_WRITER_OF_THIS_ARTICLE
    const { data, code } = value as
      | AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE
      | AutoViewInputSubTypes.IS_NOT_WRITER_OF_THIS_ARTICLE;
    icon = <LucideReact.AlertTriangle className="text-red-500" size={24} />;
    title = "Error";
    details = (
      <div className="mt-2 space-y-1">
        <p className="text-gray-700 break-all">{data}</p>
        <div className="text-sm text-gray-500">Code: {code}</div>
      </div>
    );
  }

  // 2. Compose the visual structure
  return (
    <div className="flex items-start p-4 bg-white rounded-lg shadow-md max-w-md w-full">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {details}
      </div>
    </div>
  );
}
