import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Status Check Policy
     *
     * @title Status Check Policy
    */
    export interface status_check_policy {
        url: string & tags.Format<"uri">;
        strict: boolean;
        contexts: string[];
        checks: {
            context: string;
            app_id: (number & tags.Type<"int32">) | null;
        }[];
        contexts_url: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.status_check_policy;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { url, strict, contexts, checks, contexts_url } = value;
  const contextsCount = contexts.length;
  const checksCount = checks.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 space-y-6">
      {/* Header with Title and Strict Mode Indicator */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Status Check Policy</h2>
        <div className="flex items-center gap-1">
          {strict ? (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={16} />
          )}
          <span className="text-sm font-medium text-gray-700">
            {strict ? "Strict Mode" : "Non-Strict Mode"}
          </span>
        </div>
      </div>

      {/* URLs Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <LucideReact.Link className="text-gray-400" size={16} />
          <span
            title={url}
            className="text-sm text-blue-600 break-all truncate"
          >
            {url}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Link className="text-gray-400" size={16} />
          <span
            title={contexts_url}
            className="text-sm text-blue-600 break-all truncate"
          >
            {contexts_url}
          </span>
        </div>
      </div>

      {/* Contexts List */}
      <div>
        <h3 className="text-sm font-medium text-gray-800">
          Contexts ({contextsCount})
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {contexts.map((ctx, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
            >
              <LucideReact.Tag size={12} className="text-gray-500" />
              {ctx}
            </span>
          ))}
        </div>
      </div>

      {/* Checks List */}
      <div>
        <h3 className="text-sm font-medium text-gray-800">
          Checks ({checksCount})
        </h3>
        <ul className="mt-2 space-y-1 max-h-40 overflow-y-auto">
          {checks.map((chk, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between bg-gray-50 px-3 py-1 rounded text-sm text-gray-700"
            >
              <div className="flex items-center gap-1">
                <LucideReact.Tag size={12} className="text-gray-500" />
                <span className="truncate">{chk.context}</span>
              </div>
              <span className="text-xs text-gray-500">
                {chk.app_id !== null ? `App ID: ${chk.app_id}` : "App ID: N/A"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
