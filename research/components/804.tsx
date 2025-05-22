import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * License Content
   *
   * @title License Content
   */
  export type license_content = {
    name: string;
    path: string;
    sha: string;
    size: number & tags.Type<"int32">;
    url: string & tags.Format<"uri">;
    html_url: (string & tags.Format<"uri">) | null;
    git_url: (string & tags.Format<"uri">) | null;
    download_url: (string & tags.Format<"uri">) | null;
    type: string;
    content: string;
    encoding: string;
    _links: {
      git: (string & tags.Format<"uri">) | null;
      html: (string & tags.Format<"uri">) | null;
      self: string & tags.Format<"uri">;
    };
    license: AutoViewInputSubTypes.nullable_license_simple;
  };
  /**
   * License Simple
   *
   * @title License Simple
   */
  export type nullable_license_simple = {
    key: string;
    name: string;
    url: (string & tags.Format<"uri">) | null;
    spdx_id: string | null;
    node_id: string;
    html_url?: string & tags.Format<"uri">;
  } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.license_content;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Decode the Base64 content for preview
  const decodedContent = React.useMemo(() => {
    try {
      return atob(value.content);
    } catch {
      return value.content;
    }
  }, [value.content]);

  // Prepare a truncated preview (first 5 lines)
  const previewText = React.useMemo(() => {
    const lines = decodedContent.split(/\r?\n/);
    return lines.length > 5
      ? [...lines.slice(0, 5), "..."].join("\n")
      : decodedContent;
  }, [decodedContent]);

  // Human-readable size formatting
  const formattedSize = React.useMemo(() => {
    const bytes = value.size;
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  }, [value.size]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header: Filename and Size */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <LucideReact.FileText className="text-indigo-500" size={20} />
          <span className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </span>
        </div>
        <span className="text-sm text-gray-500">{formattedSize}</span>
      </div>

      {/* File metadata grid */}
      <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1 truncate">
          <LucideReact.Hash className="text-gray-400" size={16} />
          <span className="truncate">{value.sha}</span>
        </div>
        <div className="flex items-center gap-1 capitalize truncate">
          <LucideReact.File className="text-gray-400" size={16} />
          <span>{value.type}</span>
        </div>
        {value.html_url && (
          <div className="flex items-center gap-1 col-span-2 truncate">
            <LucideReact.Link className="text-gray-400" size={16} />
            <span className="truncate">{value.html_url}</span>
          </div>
        )}
        {value.download_url && (
          <div className="flex items-center gap-1 col-span-2 truncate">
            <LucideReact.Download className="text-gray-400" size={16} />
            <span className="truncate">{value.download_url}</span>
          </div>
        )}
      </div>

      {/* License metadata */}
      {value.license && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <LucideReact.Tag className="text-blue-500" size={16} />
          <span className="font-medium text-gray-800 truncate">
            {value.license.name}
            {value.license.spdx_id ? ` (${value.license.spdx_id})` : ""}
          </span>
        </div>
      )}

      {/* Content preview */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-1 text-sm text-gray-700">
          <LucideReact.ScrollText size={16} className="text-gray-500" />
          <span className="font-medium">Content Preview</span>
        </div>
        <pre className="p-2 bg-gray-50 rounded-md text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">
          {previewText}
        </pre>
      </div>
    </div>
  );
}
