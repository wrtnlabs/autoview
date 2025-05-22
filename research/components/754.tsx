import * as LucideReact from "lucide-react";
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
  // 1. Data transformation
  const { sha, tree, truncated } = value;
  const totalItems = tree.length;
  const shortSha = sha.slice(0, 7);

  // Sort directories before files, then by name
  const sortedItems = [...tree].sort((a, b) => {
    if (a.type === b.type) return a.path.localeCompare(b.path);
    return a.type === "tree" ? -1 : 1;
  });

  // Human-readable byte formatter
  function formatSize(bytes?: number): string {
    if (bytes == null) return "";
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <LucideReact.GitBranch size={20} className="text-gray-600" />
          <span>Git Tree</span>
        </h3>
        {truncated && (
          <div className="flex items-center text-amber-500 text-sm">
            <LucideReact.AlertTriangle size={16} className="mr-1" />
            <span>Partial results</span>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="text-xs text-gray-500 mb-4">
        SHA: <span className="font-mono">{shortSha}</span> · {totalItems} items
      </div>

      {/* Tree entries list */}
      <ul className="divide-y divide-gray-100">
        {sortedItems.map((item) => {
          const isDir = item.type === "tree";
          const Icon = isDir ? LucideReact.Folder : LucideReact.FileText;
          const sizeLabel = isDir ? "" : formatSize(item.size);
          const itemSha = item.sha.slice(0, 7);

          return (
            <li
              key={`${item.sha}-${item.path}`}
              className="py-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Icon size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-gray-800 truncate">{item.path}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                {sizeLabel && <span>{sizeLabel}</span>}
                <span className="font-mono">{itemSha}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
