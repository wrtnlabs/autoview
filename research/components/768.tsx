import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalFiles = value.length;
  const totalSize = value.reduce((sum, file) => sum + file.size, 0);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${formatted} ${sizes[i]}`;
  };

  const formattedTotalSize = formatBytes(totalSize);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Summary */}
      <div className="mb-4 text-sm text-gray-600">
        {`Displaying ${totalFiles} file${totalFiles !== 1 ? 's' : ''} • ${formattedTotalSize} total`}
      </div>

      {/* File list */}
      <div className="space-y-4">
        {value.map((file) => (
          <div
            key={file.oid}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="min-w-0">
              <div className="text-lg font-medium text-gray-900 truncate">
                {file.ref_name}
              </div>
              <div className="mt-1 text-sm text-gray-500 truncate">
                {file.path}
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 text-sm font-semibold text-gray-700">
              {formatBytes(file.size)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
