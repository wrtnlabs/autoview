import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace shared {
    export type IntegerView = {
      result?: number & tags.Type<"int32">;
    };
  }
}
export type AutoViewInput = AutoViewInputSubTypes.shared.IntegerView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const result = value.result;
  const formattedResult =
    result != null
      ? new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
          result,
        )
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (formattedResult === null) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
        <LucideReact.AlertCircle size={24} className="text-gray-400 mb-2" />
        <span className="text-sm text-gray-500">No Data</span>
      </div>
    );
  }

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <div className="flex-shrink-0">
        <LucideReact.Hash size={24} className="text-indigo-500" />
      </div>
      <div className="ml-3">
        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Result
        </div>
        <div className="mt-1 text-2xl font-semibold text-gray-900">
          {formattedResult}
        </div>
      </div>
    </div>
  );
}
