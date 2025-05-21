import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace shared {
        export type StringView = {
            result?: string;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.shared.StringView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Trim whitespace and prepare a boolean flag for rendering.
  const text = value.result?.trim() ?? ''
  const hasText = text.length > 0

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We present a titled card with the result text, clamped to three lines for readability.
  //    If there's no text, show a subtle placeholder message.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Result</h2>
      {hasText ? (
        <p className="text-gray-700 text-sm whitespace-pre-wrap overflow-hidden text-ellipsis line-clamp-3">
          {text}
        </p>
      ) : (
        <p className="text-gray-500 italic text-sm">No result available.</p>
      )}
    </div>
  )
}
