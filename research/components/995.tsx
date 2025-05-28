import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Hovercard
     *
     * @title Hovercard
    */
    export interface hovercard {
        contexts: {
            message: string;
            octicon: string;
        }[];
    }
}
export type AutoViewInput = AutoViewInputSubTypes.hovercard;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Here, we simply extract the contexts array.
  const { contexts } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We render a card-like container listing each context with its octicon and message.
  //    If there are no contexts, show an empty state with an alert icon.
  const hasContexts = contexts && contexts.length > 0;

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {hasContexts ? (
        <ul className="divide-y divide-gray-200">
          {contexts.map((ctx, idx) => (
            <li key={idx} className="flex items-center space-x-2 py-2">
              <code className="flex-shrink-0 bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-xs font-mono">
                {ctx.octicon}
              </code>
              <span className="text-gray-700 break-words">{ctx.message}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={24} className="text-gray-400" aria-hidden="true" />
          <span className="mt-2 text-sm">No contexts available</span>
        </div>
      )}
    </div>
  );
}
