import React from "react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = string;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Here, the input is a simple string – we'll trim whitespace and prepare for display.
  const textContent: string = (value ?? "").trim();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We wrap the text in a styled card with responsive typography and line clamping for long text.
  const content = (
    <div className="max-w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <p className="text-gray-800 text-base md:text-lg leading-relaxed whitespace-pre-line line-clamp-3">
        {textContent}
      </p>
    </div>
  );

  // 3. Return the React element.
  return content;
}
