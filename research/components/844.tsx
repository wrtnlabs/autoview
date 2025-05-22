import { tags } from "typia";
import React from "react";
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
  // 1. Derived utilities and constants
  const formatBytes = (bytes: number): string => {
    const thresh = 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }
    const units = ["KB", "MB", "GB", "TB"];
    let u = -1;
    let b = bytes;
    do {
      b /= thresh;
      u++;
    } while (Math.abs(b) >= thresh && u < units.length - 1);
    return b.toFixed(1) + " " + units[u];
  };

  const decodedContent = (() => {
    try {
      if (value.encoding === "base64") {
        return typeof atob === "function" ? atob(value.content) : value.content;
      }
      return value.content;
    } catch {
      return value.content;
    }
  })();

  const previewText =
    decodedContent.length > 500
      ? decodedContent.slice(0, 500) + "..."
      : decodedContent;

  const links: { label: string; url: string }[] = [
    { label: "HTML URL", url: value.html_url || "" },
    { label: "Download URL", url: value.download_url || "" },
    { label: "Git URL", url: value.git_url || "" },
  ].filter((link) => link.url);

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md space-y-4">
      {/* File Name & Path */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        {value.path && value.path !== value.name && (
          <p className="text-sm text-gray-500 truncate">{value.path}</p>
        )}
      </div>

      {/* Metadata Row */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span>Size: {formatBytes(value.size)}</span>
        <span>Encoding: {value.encoding}</span>
        <span>SHA: {value.sha.slice(0, 7)}</span>
        {value.target && <span>Target: {value.target}</span>}
        {value.submodule_git_url && (
          <span className="truncate">
            Submodule: {value.submodule_git_url}
          </span>
        )}
      </div>

      {/* Links Section */}
      {links.length > 0 && (
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-700">Links</h3>
          <div className="space-y-1">
            {links.map((link) => (
              <p key={link.label} className="text-xs text-blue-600 break-all">
                <span className="font-medium">{link.label}:</span> {link.url}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Content Preview */}
      {previewText && (
        <div>
          <h3 className="text-sm font-medium text-gray-700">Preview</h3>
          <pre className="mt-1 p-2 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-40">
            {previewText}
          </pre>
        </div>
      )}
    </div>
  );
}
