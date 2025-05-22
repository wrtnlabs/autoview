import { tags } from "typia";
import React from "react";
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
  const { result } = value;
  const displayResult =
    result != null ? new Intl.NumberFormat().format(result) : "N/A";
  const resultColor =
    result == null
      ? "text-gray-400"
      : result >= 0
      ? "text-green-600"
      : "text-red-600";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  // 3. Return the React element.
  return (
    <div className="max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-sm font-medium text-gray-500 mb-2 text-center">
        Result
      </h2>
      <p
        className={`text-3xl font-semibold text-center ${resultColor}`}
        title={result != null ? String(result) : undefined}
      >
        {displayResult}
      </p>
    </div>
  );
}
