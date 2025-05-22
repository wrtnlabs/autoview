import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The hierarchy between files in a Git repository.
     *
     * @title Git Tree
    */
    export type git_tree = {
        sha: string;
        url?: string & tags.Format<"uri">;
        truncated: boolean;
        /**
         * Objects specifying a tree structure
        */
        tree: {
            path: string;
            mode: string;
            type: string;
            sha: string;
            size?: number & tags.Type<"int32">;
            url?: string;
        }[];
    };
}
export type AutoViewInput = AutoViewInputSubTypes.git_tree;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalItems = value.tree.length;
  const fileCount = value.tree.filter((item) => item.type === "blob").length;
  const dirCount = value.tree.filter((item) => item.type === "tree").length;
  const shortSha = value.sha.slice(0, 7);
  const isTruncated = value.truncated;

  const formatSize = (bytes?: number): string => {
    if (bytes == null) return "-";
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Git Tree <span className="font-mono text-gray-600">{shortSha}</span>
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {fileCount} file{fileCount !== 1 && "s"}, {dirCount} director
            {dirCount !== 1 ? "ies" : "y"} &middot; {totalItems} item
            {totalItems !== 1 && "s"}
          </p>
        </div>
        {isTruncated && (
          <span className="mt-2 sm:mt-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Truncated
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Path
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {value.tree.map((item, idx) => (
              <tr key={idx}>
                <td className="px-3 py-2 text-sm text-gray-800 truncate max-w-xs">
                  {item.path}
                </td>
                <td className="px-3 py-2 text-sm text-gray-800">
                  {item.type === "tree" ? "📁 Directory" : "📄 File"}
                </td>
                <td className="px-3 py-2 text-sm text-gray-800 text-right">
                  {item.type === "tree" ? "-" : formatSize(item.size)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {value.url && (
        <p className="mt-4 text-xs text-gray-500 truncate">{value.url}</p>
      )}
    </div>
  );
}
