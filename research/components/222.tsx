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
  //    Format the integer with locale-based thousands separators.
  const raw = value.result;
  const formattedResult =
    typeof raw === "number" ? new Intl.NumberFormat("en-US").format(raw) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Show an icon + formatted number or an empty-state placeholder.
  const display = formattedResult ? (
    <div className="flex items-center gap-2 text-gray-800 text-lg font-medium">
      <LucideReact.Hash className="text-gray-500" size={20} />
      <span>{formattedResult}</span>
    </div>
  ) : (
    <div className="flex flex-col items-center text-gray-400">
      <LucideReact.AlertCircle size={24} />
      <span className="mt-2 text-sm">No result available</span>
    </div>
  );

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-center">
      {display}
    </div>
  );
}
