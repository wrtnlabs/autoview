import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Content File
   *
   * @title Content File
   */
  export type content_file = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.content_file;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformations: format file size and shorten SHA
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
  };
  const formattedSize = formatBytes(value.size);
  const shortSha = value.sha.slice(0, 7);

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 text-gray-800">
      {/* Header: File icon, name, and path */}
      <div className="flex items-center space-x-2">
        <LucideReact.FileText
          size={20}
          className="text-indigo-500"
          aria-label="File"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-lg truncate">{value.name}</span>
          <span className="text-sm text-gray-500 break-all">{value.path}</span>
        </div>
      </div>

      {/* Metadata: encoding, size, SHA */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Code
            size={16}
            className="text-gray-400"
            aria-label="Encoding"
          />
          <span>{value.encoding}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Archive
            size={16}
            className="text-gray-400"
            aria-label="Size"
          />
          <span>{formattedSize}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.GitBranch
            size={16}
            className="text-gray-400"
            aria-label="SHA"
          />
          <span>{shortSha}</span>
        </div>
      </div>

      {/* URLs (displayed as text, non-clickable) */}
      {(value.html_url || value.download_url || value.git_url) && (
        <div className="grid grid-cols-1 gap-2 text-sm">
          {value.html_url && (
            <div className="flex items-center gap-1 break-all">
              <LucideReact.Link
                size={16}
                className="text-gray-500"
                aria-label="HTML URL"
              />
              <span>{value.html_url}</span>
            </div>
          )}
          {value.download_url && (
            <div className="flex items-center gap-1 break-all">
              <LucideReact.DownloadCloud
                size={16}
                className="text-gray-500"
                aria-label="Download URL"
              />
              <span>{value.download_url}</span>
            </div>
          )}
          {value.git_url && (
            <div className="flex items-center gap-1 break-all">
              <LucideReact.GitBranch
                size={16}
                className="text-gray-500"
                aria-label="Git URL"
              />
              <span>{value.git_url}</span>
            </div>
          )}
        </div>
      )}

      {/* Content preview (first few lines, truncated) */}
      {value.content && (
        <pre className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-700 whitespace-pre-wrap overflow-hidden line-clamp-5">
          {value.content}
        </pre>
      )}
    </div>
  );
}
