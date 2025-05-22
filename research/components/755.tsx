import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // 1. Data aggregation and transformation
  const rootSha = value.sha.slice(0, 7);
  const fileCount = value.tree.filter((item) => item.type === "blob").length;
  const dirCount = value.tree.filter((item) => item.type === "tree").length;
  const totalCount = value.tree.length;

  const formatBytes = (bytes?: number): string => {
    if (bytes == null) return "-";
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(1)} GB`;
  };

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header: root SHA, summary counts, truncated indicator */}
      <div className="mb-4 flex flex-wrap items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Hash size={16} className="text-gray-500" />
          <span className="font-mono">{rootSha}</span>
        </div>
        <div className="text-gray-500">
          Items: {totalCount} (
          <span className="text-gray-700">{fileCount} files</span>,{" "}
          <span className="text-gray-700">{dirCount} dirs</span>)
        </div>
        {value.truncated && (
          <div className="flex items-center text-amber-500">
            <LucideReact.AlertTriangle size={16} />
            <span className="ml-1">Truncated</span>
          </div>
        )}
      </div>

      {/* Tree items list */}
      <ul className="divide-y divide-gray-100 border-t border-b border-gray-200 max-h-64 overflow-y-auto">
        {value.tree.map((item) => (
          <li
            key={item.sha}
            className="flex items-center justify-between py-2 text-sm"
          >
            <div className="flex items-center gap-2 min-w-0">
              {item.type === "tree" ? (
                <LucideReact.Folder
                  size={16}
                  className="text-blue-500 flex-shrink-0"
                />
              ) : (
                <LucideReact.FileText
                  size={16}
                  className="text-gray-500 flex-shrink-0"
                />
              )}
              <span className="truncate">{item.path}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-500 min-w-0">
              {item.type === "blob" && (
                <span className="font-mono">{formatBytes(item.size)}</span>
              )}
              {item.url && (
                <div className="flex items-center gap-1 min-w-0">
                  <LucideReact.Link size={16} />
                  <span className="break-all truncate max-w-xs">
                    {item.url}
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
