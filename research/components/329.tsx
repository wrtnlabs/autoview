import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Code Of Conduct
   *
   * @title Code Of Conduct
   */
  export type code_of_conduct = {
    key: string;
    name: string;
    url: string & tags.Format<"uri">;
    body?: string;
    html_url: (string & tags.Format<"uri">) | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.code_of_conduct;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Determine presence of optional properties
  const hasBody = typeof value.body === "string" && value.body.trim() !== "";
  const hasHtmlUrl =
    typeof value.html_url === "string" && value.html_url.trim() !== "";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-w-0">
      {/* Header with document icon and Code of Conduct name */}
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 truncate">
        <LucideReact.FileText size={20} className="text-gray-500" />
        {value.name}
      </h2>

      {/* Display raw URL (primary) */}
      <div className="mt-3 flex items-start gap-2 text-sm text-gray-700">
        <LucideReact.Link size={16} className="text-gray-400 flex-shrink-0" />
        <span className="break-all">{value.url}</span>
      </div>

      {/* Display HTML URL if provided */}
      {hasHtmlUrl && (
        <div className="mt-1 flex items-start gap-2 text-sm text-gray-700">
          <LucideReact.Link size={16} className="text-gray-400 flex-shrink-0" />
          <span className="break-all">{value.html_url}</span>
        </div>
      )}

      {/* Display body text, truncated to three lines for readability */}
      {hasBody && (
        <div className="mt-4 text-sm text-gray-800 line-clamp-3">
          {value.body}
        </div>
      )}
    </div>
  );
}
