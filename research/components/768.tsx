import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Porter Large File
   *
   * @title Porter Large File
   */
  export type porter_large_file = {
    ref_name: string;
    path: string;
    oid: string;
    size: number & tags.Type<"int32">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.porter_large_file[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation: total number of files and total size
  const files = value;
  const totalSizeBytes = files.reduce((sum, file) => sum + file.size, 0);

  // Helper: format bytes into human-readable string
  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const num = bytes / Math.pow(k, i);
    return `${num.toFixed(1)} ${sizes[i]}`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-lg">No files available</span>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">
              {files.length} {files.length === 1 ? "file" : "files"}
            </span>
            <span className="text-sm text-gray-500">
              {formatBytes(totalSizeBytes)} total
            </span>
          </div>
          <ul className="space-y-4">
            {files.map((file) => (
              <li key={file.oid} className="flex items-center space-x-4">
                <LucideReact.FileText
                  size={24}
                  className="text-indigo-500 flex-shrink-0"
                  aria-label="File icon"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 truncate">
                      {file.ref_name}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {formatBytes(file.size)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {file.path}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
