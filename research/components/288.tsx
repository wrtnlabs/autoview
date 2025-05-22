import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type CANNOT_FINDONE_ARTICLE = {
    type: "business";
    result: false;
    code: 4004;
    data: "\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
  };
  export type ResponseForm_lt_boolean_gt_ = {
    result: true;
    code: 1000;
    requestToResponse?: string;
    data: boolean;
  };
  export type IS_NOT_WRITER_OF_THIS_ARTICLE = {
    type: "business";
    result: false;
    code: 4015;
    data: "\uC774 \uAC8C\uC2DC\uAE00\uC758 \uC791\uC131\uC790\uB9CC\uC774 \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.";
  };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE
  | AutoViewInputSubTypes.ResponseForm_lt_boolean_gt_
  | AutoViewInputSubTypes.IS_NOT_WRITER_OF_THIS_ARTICLE;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Here we discriminate between business errors (with a `type` field) and boolean responses.
  const isError = "type" in value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (isError) {
    // Business error display
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start space-x-3">
        <LucideReact.AlertTriangle
          className="flex-shrink-0 mt-1 text-red-400"
          size={20}
        />
        <div>
          <p className="font-semibold">Error</p>
          <p className="mt-1 text-sm">{value.data}</p>
        </div>
      </div>
    );
  }

  // ResponseForm<boolean> display
  const statusIcon = value.data ? (
    <LucideReact.CheckCircle
      className="flex-shrink-0 text-green-500"
      size={20}
    />
  ) : (
    <LucideReact.XCircle className="flex-shrink-0 text-red-500" size={20} />
  );
  const statusText = value.data ? "Yes" : "No";

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg flex items-center space-x-2">
      {statusIcon}
      <span className="font-medium text-gray-800">{statusText}</span>
      {value.requestToResponse && (
        <span className="ml-2 text-sm text-gray-500">
          {value.requestToResponse}
        </span>
      )}
    </div>
  );
}
