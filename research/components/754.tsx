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
  const { sha, truncated, tree } = value;
  const shortSha = sha.slice(0, 7);
  const fileCount = tree.filter((item) => item.type === "blob").length;
  const folderCount = tree.filter((item) => item.type === "tree").length;

  function formatSize(size?: number): string {
    if (size == null) return "-";
    if (size < 1024) return `${size} B`;
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-wrap items-center mb-3">
        <span className="font-mono text-gray-700">SHA: {shortSha}</span>
        {truncated && (
          <span className="ml-3 mt-2 sm:mt-0 px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
            Truncated
          </span>
        )}
      </div>
      <div className="flex text-sm text-gray-600 mb-4">
        <span className="mr-4">Folders: {folderCount}</span>
        <span>Files: {fileCount}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-700 text-sm">
          <thead>
            <tr>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3 text-right">Size</th>
            </tr>
          </thead>
          <tbody>
            {tree.map((item) => (
              <tr key={item.sha} className="border-t">
                <td className="py-2 px-3 truncate">{item.path}</td>
                <td className="py-2 px-3 capitalize">
                  {item.type === "blob" ? "File" : item.type === "tree" ? "Folder" : item.type}
                </td>
                <td className="py-2 px-3 text-right">{formatSize(item.size)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
