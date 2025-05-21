import { tags } from "typia";
import React from "react";
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
  const strictLabel = value.strict ? "Enabled" : "Disabled";
  const contextsCount = value.contexts.length;
  const checksCount = value.checks.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Status Check Policy</h2>
      </header>

      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Primary URL</h3>
          <code className="block mt-1 font-mono text-indigo-600 text-sm break-all">
            {value.url}
          </code>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Contexts URL</h3>
          <code className="block mt-1 font-mono text-indigo-600 text-sm break-all">
            {value.contexts_url}
          </code>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Strict Mode:</span>
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
              value.strict
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {strictLabel}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">
            Contexts ({contextsCount})
          </h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {value.contexts.map((ctx, idx) => (
              <span
                key={idx}
                className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {ctx}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Checks ({checksCount})</h3>
          <ul className="mt-2 space-y-2">
            {value.checks.map((check, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <span className="text-gray-800">{check.context}</span>
                <span className="text-gray-600 text-xs">
                  {check.app_id !== null ? `App ID: ${check.app_id}` : "App ID: N/A"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
