import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface ResponseForm_lt_true_gt_ {
        result: true;
        code: 1000;
        requestToResponse?: string;
        data: true;
    }
    export interface ALREADY_FOLLOW_USER {
        type: "business";
        result: false;
        code: 4008;
        data: "\uC774\uBBF8 \uC88B\uC544\uC694\uB97C \uB204\uB978 \uB514\uC790\uC774\uB108\uB2D8\uC785\uB2C8\uB2E4!";
    }
    export interface CANNOT_FIND_ONE_DESIGNER_TO_FOLLOW {
        type: "business";
        result: false;
        code: 4009;
        data: "\uD314\uB85C\uC6B0\uD560 \uB514\uC790\uC774\uB108\uB2D8\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
    }
    export interface CANNOT_FOLLOW_MYSELF {
        type: "business";
        result: false;
        code: 4017;
        data: "\uC124\uB9C8 \uC790\uAE30 \uC790\uC2E0\uC744 \uD314\uB85C\uC6B0\uD558\uB824\uACE0 \uD588\uC5B4\uC694?!";
    }
}
export type AutoViewInput = AutoViewInputSubTypes.ResponseForm_lt_true_gt_ | AutoViewInputSubTypes.ALREADY_FOLLOW_USER | AutoViewInputSubTypes.CANNOT_FIND_ONE_DESIGNER_TO_FOLLOW | AutoViewInputSubTypes.CANNOT_FOLLOW_MYSELF;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isSuccess = value.result === true;
  const containerBg = isSuccess ? 'bg-green-50' : 'bg-red-50';
  const containerBorder = isSuccess ? 'border-green-400' : 'border-red-400';
  const textColor = isSuccess ? 'text-green-800' : 'text-red-800';

  // Select appropriate icon
  const StatusIcon = isSuccess
    ? <LucideReact.CheckCircle className="text-green-500" size={20} aria-hidden="true" />
    : <LucideReact.AlertTriangle className="text-red-500" size={20} aria-hidden="true" />;

  // Determine main message to display
  const message: string = isSuccess
    ? (value as AutoViewInputSubTypes.ResponseForm_lt_true_gt_).requestToResponse
      ?? 'Operation completed successfully.'
    : (value as Exclude<AutoViewInput, AutoViewInputSubTypes.ResponseForm_lt_true_gt_>).data;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className={`flex items-start p-4 ${containerBg} border-l-4 ${containerBorder} rounded-md`}>
      <div className="mr-3 mt-1">
        {StatusIcon}
      </div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${textColor}`}>
          {message}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Code: {value.code}
        </p>
      </div>
    </div>
  );
}
