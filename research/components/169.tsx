import LucideReact from "lucide-react";
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
  const hasValue = typeof result === "number";
  const formattedResult = hasValue ? result.toLocaleString() : "N/A";
  const parityLabel = hasValue ? (result! % 2 === 0 ? "Even" : "Odd") : "";

  const icon = hasValue ? (
    <LucideReact.Hash
      className="text-blue-500"
      size={24}
      aria-label="Result number icon"
    />
  ) : (
    <LucideReact.AlertCircle
      className="text-gray-400"
      size={24}
      aria-label="No result available"
    />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      <div className="flex items-center justify-center mb-2">
        {icon}
        <span className="ml-2 text-2xl font-semibold text-gray-800">
          {formattedResult}
        </span>
      </div>
      {hasValue && (
        <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
          {parityLabel}
        </span>
      )}
    </div>
  );
}
