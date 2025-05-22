import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Status Check Policy
   *
   * @title Status Check Policy
   */
  export type status_check_policy = {
    url: string & tags.Format<"uri">;
    strict: boolean;
    contexts: string[];
    checks: {
      context: string;
      app_id: (number & tags.Type<"int32">) | null;
    }[];
    contexts_url: string & tags.Format<"uri">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.status_check_policy;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const strictIcon = value.strict ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : (
    <LucideReact.XCircle className="text-red-500" size={16} />
  );
  const maxContextDisplay = 5;
  const displayedContexts = value.contexts.slice(0, maxContextDisplay);
  const extraContextsCount = value.contexts.length - displayedContexts.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full md:max-w-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <LucideReact.ShieldCheck className="mr-2 text-blue-600" size={20} />
        Status Check Policy
      </h2>

      {/* URL */}
      <div className="flex items-center text-gray-700 mb-2">
        <LucideReact.Link className="mr-2 text-gray-500" size={16} />
        <span className="truncate">{value.url}</span>
      </div>

      {/* Contexts URL */}
      <div className="flex items-center text-gray-700 mb-4">
        <LucideReact.Link className="mr-2 text-gray-500" size={16} />
        <span className="truncate">{value.contexts_url}</span>
      </div>

      {/* Strict Enforcement */}
      <div className="flex items-center text-gray-700 mb-4">
        <span className="mr-2 font-medium text-gray-800">
          Strict Enforcement:
        </span>
        {strictIcon}
      </div>

      {/* Contexts List */}
      <div className="mb-4">
        <span className="font-medium text-gray-800">Contexts:</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {displayedContexts.map((ctx) => (
            <span
              key={ctx}
              className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm truncate"
            >
              {ctx}
            </span>
          ))}
          {extraContextsCount > 0 && (
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
              +{extraContextsCount} more
            </span>
          )}
        </div>
      </div>

      {/* Checks List */}
      <div>
        <span className="font-medium text-gray-800">Checks:</span>
        <ul className="mt-2 space-y-2">
          {value.checks.map((chk, idx) => (
            <li key={idx} className="flex items-center text-gray-700">
              <LucideReact.CheckSquare
                className="mr-2 text-gray-500"
                size={16}
              />
              <span className="flex-1 truncate">{chk.context}</span>
              {chk.app_id !== null ? (
                <span className="ml-2 text-sm text-gray-500">
                  App ID {chk.app_id}
                </span>
              ) : (
                <span className="ml-2 text-sm text-gray-400 italic">
                  No App
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
