import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Porter Large File
     *
     * @title Porter Large File
    */
    export interface porter_large_file {
        ref_name: string;
        path: string;
        oid: string;
        size: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.porter_large_file[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const fileCount = value.length;
  const totalSize = value.reduce((sum, file) => sum + file.size, 0);
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const num = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${num} ${sizes[i]}`;
  };
  const formattedTotalSize = formatBytes(totalSize);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800">Files</h2>
        <div className="text-sm text-gray-600">
          {fileCount} {fileCount === 1 ? "file" : "files"}, {formattedTotalSize}
        </div>
      </div>

      {/* Empty State */}
      {fileCount === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle
            size={24}
            className="text-gray-400"
            aria-label="No files available"
          />
          <span className="mt-2 text-sm">No files available</span>
        </div>
      ) : (
        /* File List */
        <ul className="space-y-3">
          {value.map((file) => (
            <li key={file.oid} className="flex items-start space-x-3">
              <div className="flex-shrink-0 text-indigo-500">
                <LucideReact.FileText size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.ref_name}
                </p>
                <p className="text-xs text-gray-500 truncate">{file.path}</p>
              </div>
              <div className="flex-shrink-0 text-sm text-gray-600">
                {formatBytes(file.size)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
