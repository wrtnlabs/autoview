import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Protected Branch Admin Enforced
   *
   * @title Protected Branch Admin Enforced
   */
  export type protected_branch_admin_enforced = {
    url: string & tags.Format<"uri">;
    enabled: boolean;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.protected_branch_admin_enforced;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive the displayable hostname from the URL, falling back to full URL if parsing fails.
  const displayHost: string = (() => {
    try {
      return new URL(value.url).hostname;
    } catch {
      return value.url;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
      {/* URL Display */}
      <div className="flex items-center space-x-2 truncate">
        <LucideReact.Link
          size={20}
          className="text-gray-500 flex-shrink-0"
          aria-label="Repository URL"
        />
        <a
          href={value.url}
          title={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate"
        >
          {displayHost}
        </a>
      </div>

      {/* Enabled Status */}
      <div className="flex items-center space-x-1">
        {value.enabled ? (
          <LucideReact.CheckCircle
            size={20}
            className="text-green-500 flex-shrink-0"
            aria-label="Enabled"
          />
        ) : (
          <LucideReact.XCircle
            size={20}
            className="text-red-500 flex-shrink-0"
            aria-label="Disabled"
          />
        )}
        <span
          className={`text-sm font-medium ${
            value.enabled ? "text-green-700" : "text-red-700"
          }`}
        >
          {value.enabled ? "Enabled" : "Disabled"}
        </span>
      </div>
    </div>
  );
}
