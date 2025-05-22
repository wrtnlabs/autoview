import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Blob
   *
   * @title Blob
   */
  export type blob = {
    content: string;
    encoding: string;
    url: string & tags.Format<"uri">;
    sha: string;
    size: (number & tags.Type<"int32">) | null;
    node_id: string;
    highlighted_content?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.blob;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedSize =
    value.size != null
      ? value.size < 1024
        ? `${value.size} B`
        : value.size < 1024 * 1024
          ? `${(value.size / 1024).toFixed(1)} KB`
          : `${(value.size / (1024 * 1024)).toFixed(1)} MB`
      : "Unknown size";

  const truncatedSha = value.sha.slice(0, 7);

  const renderContent = () => {
    if (value.highlighted_content) {
      return (
        <div
          className="prose max-w-full overflow-auto text-sm font-mono"
          dangerouslySetInnerHTML={{ __html: value.highlighted_content }}
        />
      );
    }

    let decoded = value.content;
    if (value.encoding === "base64") {
      try {
        decoded = atob(value.content);
      } catch {
        // leave content as-is if decoding fails
      }
    }

    return (
      <pre className="whitespace-pre-wrap break-all text-sm font-mono bg-gray-50 p-2 rounded">
        {decoded}
      </pre>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* File metadata */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-600 text-sm">
        <div className="flex items-center space-x-2">
          <LucideReact.FileText size={16} className="text-gray-500" />
          <span>{formattedSize}</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>{value.encoding.toUpperCase()}</span>
        </div>
        <div className="flex items-center space-x-1 mt-2 sm:mt-0">
          <LucideReact.Activity size={16} className="text-gray-500" />
          <span className="font-mono">{truncatedSha}</span>
        </div>
      </div>

      {/* Content preview */}
      <div className="w-full max-h-64 overflow-auto border border-gray-200 rounded">
        {renderContent()}
      </div>

      {/* URL display */}
      <div className="flex items-center text-gray-500 text-sm space-x-1">
        <LucideReact.Link size={16} />
        <span className="truncate">{value.url}</span>
      </div>
    </div>
  );
}
