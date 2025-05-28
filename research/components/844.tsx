import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Content File
     *
     * @title Content File
    */
    export interface content_file {
        type: "file";
        encoding: string;
        size: number & tags.Type<"int32">;
        name: string;
        path: string;
        content: string;
        sha: string;
        url: string & tags.Format<"uri">;
        git_url: (string & tags.Format<"uri">) | null;
        html_url: (string & tags.Format<"uri">) | null;
        download_url: (string & tags.Format<"uri">) | null;
        _links: {
            git: (string & tags.Format<"uri">) | null;
            html: (string & tags.Format<"uri">) | null;
            self: string & tags.Format<"uri">;
        };
        target?: string;
        submodule_git_url?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.content_file;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };
  const formattedSize = formatBytes(value.size);
  const preview =
    value.content.length > 200
      ? value.content.slice(0, 200) + "..."
      : value.content;
  const shortSha = value.sha.slice(0, 7);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Icon + File Name */}
      <div className="flex items-center mb-3">
        <LucideReact.FileText size={20} className="text-indigo-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* File Attributes */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Folder size={16} className="text-gray-400 mr-1" />
          <span className="truncate">{value.path}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Code2 size={16} className="text-gray-400 mr-1" />
          <span>{value.encoding}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Archive size={16} className="text-gray-400 mr-1" />
          <span>{formattedSize}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Code size={16} className="text-gray-400 mr-1" />
          <span className="font-mono">{shortSha}</span>
        </div>
      </div>

      {/* Links Section */}
      {(value.url || value.html_url || value.download_url) && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Links</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <LucideReact.Link size={16} className="text-blue-500 mr-1" />
              <span className="truncate">{value.url}</span>
            </div>
            {value.html_url && (
              <div className="flex items-center">
                <LucideReact.Link size={16} className="text-blue-500 mr-1" />
                <span className="truncate">{value.html_url}</span>
              </div>
            )}
            {value.download_url && (
              <div className="flex items-center">
                <LucideReact.Link size={16} className="text-blue-500 mr-1" />
                <span className="truncate">{value.download_url}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Preview */}
      {value.content && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
          <pre className="max-h-40 overflow-auto bg-gray-100 text-xs text-gray-800 p-2 rounded whitespace-pre-wrap">
            {preview}
          </pre>
        </div>
      )}
    </div>
  );
}
