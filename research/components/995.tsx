import LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  const contextCount = contexts.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Related Context{contextCount !== 1 ? "s" : ""} ({contextCount})
      </h3>

      {contextCount > 0 ? (
        contexts.map((ctx, idx) => {
          // Try to resolve the icon from LucideReact; fallback to Info
          const IconComponent =
            (LucideReact as any)[ctx.octicon] ?? LucideReact.Info;

          return (
            <div
              key={idx}
              className="flex items-start space-x-2 mb-2 last:mb-0"
            >
              <IconComponent
                size={16}
                className="text-gray-500 flex-shrink-0"
                aria-label={ctx.octicon}
              />
              <p className="text-sm text-gray-700">{ctx.message}</p>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="ml-2 text-sm">No contexts available.</span>
        </div>
      )}
    </div>
  );
}
