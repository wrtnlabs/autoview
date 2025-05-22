import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Short Blob
   *
   * @title Short Blob
   */
  export type short_blob = {
    url: string;
    sha: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.short_blob;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const fileName = value.url.split("/").pop() || value.url;
  const shortSha = value.sha.slice(0, 7);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* File Name Header */}
      <div className="flex items-center mb-3">
        <LucideReact.FileText size={20} className="text-indigo-500 mr-2" />
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={fileName}
        >
          {fileName}
        </h2>
      </div>
      {/* URL and SHA details */}
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-start gap-2 break-all">
          <LucideReact.Link size={16} className="mt-0.5 text-gray-500" />
          <span className="break-all">{value.url}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Hash size={16} className="text-gray-500" />
          <code className="font-mono">{shortSha}</code>
          <span className="ml-auto text-xs text-gray-400">truncated SHA</span>
        </div>
        <div className="ml-6 text-xs text-gray-400 font-mono break-all">
          Full SHA: {value.sha}
        </div>
      </div>
    </div>
  );
}
