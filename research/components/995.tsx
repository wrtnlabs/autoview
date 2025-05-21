import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Hovercard
     *
     * @title Hovercard
    */
    export type hovercard = {
        contexts: {
            message: string;
            octicon: string;
        }[];
    };
}
export type AutoViewInput = AutoViewInputSubTypes.hovercard;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const contexts = Array.isArray(value.contexts) ? value.contexts : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (contexts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 italic">
        No context available
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <ul className="space-y-3">
        {contexts.map((ctx, idx) => (
          <li key={idx} className="flex items-start space-x-3">
            {/* Display the octicon name in a monospace style as a placeholder for the icon */}
            <span className="flex-shrink-0 font-mono text-gray-600">
              {ctx.octicon}
            </span>
            {/* Display the context message */}
            <p className="text-gray-800 leading-tight break-words">
              {ctx.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
