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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Formatting file size into human-readable units.
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    return `${(mb / 1024).toFixed(2)} GB`;
  };
  const formattedSize = formatBytes(value.size);
  const shortSha = value.sha.slice(0, 7);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow ring-1 ring-gray-200">
      {/* File header */}
      <div className="flex items-center mb-2">
        <LucideReact.FileText className="text-indigo-500" size={20} />
        <h2 className="ml-2 text-lg font-medium text-gray-800 truncate">
          {value.name}
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-4 truncate">{value.path}</p>

      {/* File details grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <span className="font-medium">Size:</span>
          <span className="ml-1">{formattedSize}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Encoding:</span>
          <span className="ml-1 capitalize">{value.encoding}</span>
        </div>
        <div className="flex items-center col-span-2">
          <span className="font-medium">SHA:</span>
          <span className="ml-1 font-mono break-all">{shortSha}</span>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col space-y-2 text-sm text-blue-600 overflow-x-auto">
        {value.html_url && (
          <div className="flex items-center">
            <LucideReact.Link size={16} className="text-gray-400" />
            <span className="ml-1 truncate">{value.html_url}</span>
          </div>
        )}
        {value.download_url && (
          <div className="flex items-center">
            <LucideReact.Download size={16} className="text-gray-400" />
            <span className="ml-1 truncate">{value.download_url}</span>
          </div>
        )}
      </div>
    </div>
  );
}
