import * as LucideReact from "lucide-react";
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
  const totalChecks = value.checks.length;
  const checksWithAppId = value.checks.filter((c) => c.app_id !== null).length;
  const checksWithoutAppId = totalChecks - checksWithAppId;
  const displayChecks = value.checks.map((c) => ({
    context: c.context,
    appId: c.app_id === null ? "None" : String(c.app_id),
  }));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      {/* Endpoint URLs */}
      <div className="flex items-start gap-2 mb-4">
        <LucideReact.Link className="text-gray-400 mt-1" size={16} />
        <div className="flex-1 text-sm text-gray-700 break-all">
          <div className="font-medium">Policy URL</div>
          <div className="truncate">{value.url}</div>
        </div>
      </div>
      <div className="flex items-start gap-2 mb-4">
        <LucideReact.Link className="text-gray-400 mt-1" size={16} />
        <div className="flex-1 text-sm text-gray-700 break-all">
          <div className="font-medium">Contexts URL</div>
          <div className="truncate">{value.contexts_url}</div>
        </div>
      </div>

      {/* Strict Mode Indicator */}
      <div className="flex items-center mb-4">
        {value.strict ? (
          <LucideReact.CheckCircle className="text-green-500" size={16} />
        ) : (
          <LucideReact.XCircle className="text-red-500" size={16} />
        )}
        <span className="ml-2 text-sm font-medium text-gray-800">
          {value.strict ? "Strict Mode Enabled" : "Strict Mode Disabled"}
        </span>
      </div>

      {/* Contexts List */}
      <div className="mb-4">
        <div className="flex items-center text-sm text-gray-700 mb-2">
          <LucideReact.Tag className="text-gray-500" size={16} />
          <span className="ml-2 font-medium">
            Contexts ({value.contexts.length})
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {value.contexts.map((ctx, idx) => (
            <li
              key={idx}
              className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded break-all"
            >
              {ctx}
            </li>
          ))}
        </ul>
      </div>

      {/* Checks Summary and Details */}
      <div>
        <div className="flex items-center text-sm text-gray-700 mb-2">
          <LucideReact.CheckCircle className="text-gray-500" size={16} />
          <span className="ml-2 font-medium">Checks Summary</span>
        </div>
        <div className="space-y-1 text-sm text-gray-600 mb-2">
          <div>Total checks: {totalChecks}</div>
          <div>With App ID: {checksWithAppId}</div>
          <div>Without App ID: {checksWithoutAppId}</div>
        </div>
        <ul className="max-h-32 overflow-y-auto text-sm text-gray-700 space-y-1">
          {displayChecks.map((chk, idx) => (
            <li
              key={idx}
              className="flex justify-between bg-gray-50 px-2 py-1 rounded"
            >
              <span className="truncate">{chk.context}</span>
              <span className="font-mono text-gray-500">{chk.appId}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
