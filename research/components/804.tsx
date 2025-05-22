import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatSize = (size: number): string => {
    if (size >= 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${size} B`;
  };

  // Decode base64 content safely and create a truncated snippet
  let decodedContent = "";
  try {
    decodedContent = typeof atob === "function" ? atob(value.content) : "";
  } catch {
    decodedContent = "";
  }
  const contentSnippet = decodedContent.length > 0
    ? decodedContent.slice(0, 200) + (decodedContent.length > 200 ? "…" : "")
    : "(No preview available)";

  const license = value.license;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <span className="text-xs font-medium uppercase bg-gray-200 text-gray-600 px-2 py-1 rounded">
          {value.type}
        </span>
      </div>

      {/* Metadata */}
      <div className="space-y-1 text-sm text-gray-600 mb-3">
        <p className="truncate">
          <span className="font-medium">Path:</span> {value.path}
        </p>
        <p>
          <span className="font-medium">SHA:</span>{" "}
          <span className="font-mono">{value.sha}</span>
        </p>
        <p>
          <span className="font-medium">Size:</span> {formatSize(value.size)}
        </p>
        <p className="truncate">
          <span className="font-medium">URL:</span> {value.url}
        </p>
        {value.html_url && (
          <p className="truncate">
            <span className="font-medium">HTML URL:</span> {value.html_url}
          </p>
        )}
      </div>

      {/* Content Snippet */}
      <div className="bg-gray-50 p-3 rounded-md mb-3">
        <h3 className="text-sm font-medium text-gray-700 mb-1">Content Preview</h3>
        <pre className="text-xs font-mono text-gray-700 overflow-hidden line-clamp-3">
          {contentSnippet}
        </pre>
      </div>

      {/* License Information */}
      <div className="border-t pt-3">
        <h3 className="text-sm font-medium text-gray-700 mb-1">License</h3>
        {license ? (
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium">Name:</span> {license.name}
            </p>
            <p>
              <span className="font-medium">SPDX ID:</span>{" "}
              {license.spdx_id ?? "N/A"}
            </p>
            <p className="truncate">
              <span className="font-medium">URL:</span>{" "}
              {license.url ?? "N/A"}
            </p>
            {license.html_url && (
              <p className="truncate">
                <span className="font-medium">HTML URL:</span>{" "}
                {license.html_url}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No license information.</p>
        )}
      </div>
    </div>
  );
}
