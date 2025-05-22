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
  const rawResult = value.result;
  const hasResult = typeof rawResult === "number";
  const formattedResult = hasResult
    ? new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
        rawResult!,
      )
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-xs mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center space-y-4">
      <LucideReact.Hash
        size={32}
        className="text-blue-500"
        aria-hidden="true"
      />
      {hasResult ? (
        <span className="text-3xl font-bold text-gray-800">
          {formattedResult}
        </span>
      ) : (
        <div className="flex flex-col items-center text-gray-400 space-y-1">
          <LucideReact.AlertCircle size={24} aria-hidden="true" />
          <span className="text-sm">No data available</span>
        </div>
      )}
    </div>
  );
}
