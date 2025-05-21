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
  const strictLabel = value.strict ? "Strict" : "Non-Strict";
  const strictBadgeClasses = value.strict
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";
  const contextCount = value.contexts.length;
  const checkCount = value.checks.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 max-w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Check Policy</h2>

      <div className="space-y-2 mb-6 text-sm text-gray-700">
        <div>
          <span className="font-medium">Policy URL:</span>
          <span className="text-blue-600 truncate break-words block ml-1">{value.url}</span>
        </div>
        <div>
          <span className="font-medium">Contexts URL:</span>
          <span className="text-blue-600 truncate break-words block ml-1">{value.contexts_url}</span>
        </div>
        <div>
          <span className="font-medium">Strict Mode:</span>
          <span
            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ml-1 ${strictBadgeClasses}`}
          >
            {strictLabel}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <span className="font-medium text-gray-800">Contexts ({contextCount}):</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {value.contexts.map((ctx) => (
            <span
              key={ctx}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
            >
              {ctx}
            </span>
          ))}
        </div>
      </div>

      {checkCount > 0 && (
        <div>
          <span className="font-medium text-gray-800">Checks ({checkCount}):</span>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead>
                <tr>
                  <th className="py-2 px-3">Context</th>
                  <th className="py-2 px-3">App ID</th>
                </tr>
              </thead>
              <tbody>
                {value.checks.map((chk, idx) => (
                  <tr key={idx} className="border-t border-gray-200">
                    <td className="py-2 px-3">{chk.context}</td>
                    <td className="py-2 px-3">{chk.app_id ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
