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
  const contextsCount = value.contexts.length;
  const checksCount = value.checks.length;
  const checksWithAppIdCount = value.checks.filter((c) => c.app_id !== null).length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      <h2 className="flex items-center text-gray-800 text-lg font-semibold mb-4">
        <LucideReact.ShieldCheck className="text-indigo-500 mr-2" size={20} />
        Status Check Policy
      </h2>

      {/* Policy URL */}
      <div className="flex items-start text-gray-700 mb-3">
        <LucideReact.Link size={16} className="text-gray-500 mr-2 mt-1" />
        <span className="break-all text-sm">{value.url}</span>
      </div>

      {/* Strict Mode Indicator */}
      <div className="flex items-center text-gray-700 mb-3">
        <span className="font-medium">Strict Mode:</span>
        {value.strict ? (
          <LucideReact.CheckCircle className="ml-2 text-green-500" size={16} />
        ) : (
          <LucideReact.XCircle className="ml-2 text-red-500" size={16} />
        )}
      </div>

      {/* Contexts List */}
      <div className="mb-4">
        <div className="flex items-center text-gray-700 mb-1">
          <LucideReact.Tag size={16} className="text-gray-500 mr-2" />
          <span className="font-medium">Contexts ({contextsCount})</span>
        </div>
        <div className="flex flex-wrap gap-2">
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

      {/* Checks Details */}
      <div className="mb-4">
        <div className="flex items-center text-gray-700 mb-1">
          <LucideReact.ListOrdered size={16} className="text-gray-500 mr-2" />
          <span className="font-medium">Checks ({checksCount})</span>
          {checksWithAppIdCount > 0 && (
            <span className="ml-2 text-xs text-gray-500">
              {checksWithAppIdCount} with App ID
            </span>
          )}
        </div>
        <div className="space-y-1">
          {value.checks.map((chk, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-gray-600 text-sm bg-gray-50 px-2 py-1 rounded"
            >
              <span className="break-all">{chk.context}</span>
              <span className="ml-4 font-medium">
                App ID: {chk.app_id !== null ? chk.app_id : 'N/A'}
              </span>
            </div>
          ))}
          {checksCount === 0 && (
            <div className="flex items-center text-gray-400 text-sm">
              <LucideReact.AlertCircle size={16} className="mr-1" />
              No checks defined
            </div>
          )}
        </div>
      </div>

      {/* Contexts URL */}
      <div className="flex items-start text-gray-700">
        <LucideReact.Link size={16} className="text-gray-500 mr-2 mt-1" />
        <span className="break-all text-sm">{value.contexts_url}</span>
      </div>
    </div>
  );
}
