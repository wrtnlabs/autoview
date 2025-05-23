import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The hierarchy between files in a Git repository.
     *
     * @title Git Tree
    */
    export interface git_tree {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.git_tree;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived constants
  const shortSha = value.sha.slice(0, 7);
  const itemCount = value.tree.length;

  // Utility: human-readable byte formatter
  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }

  // Main render
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      {/* Header: Commit SHA and truncation indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LucideReact.GitCommit size={20} className="text-gray-500" aria-label="Commit SHA" />
          <span className="font-mono text-sm text-gray-700">{shortSha}</span>
        </div>
        {value.truncated && (
          <div className="flex items-center text-amber-600 text-sm">
            <LucideReact.AlertTriangle size={16} className="mr-1" aria-label="Truncated" />
            <span>Truncated</span>
          </div>
        )}
      </div>

      {/* Item count */}
      <div className="flex items-center text-gray-500 text-sm">
        <LucideReact.Folder size={16} className="mr-1" aria-label="Entries" />
        <span>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Tree entries list */}
      <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
        {value.tree.map((entry) => (
          <li key={entry.sha} className="py-2 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 truncate">
              {entry.type === 'tree' ? (
                <LucideReact.Folder
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                  aria-label="Directory"
                />
              ) : (
                <LucideReact.FileText
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                  aria-label="File"
                />
              )}
              <span className="truncate">{entry.path}</span>
            </div>
            {entry.size !== undefined && (
              <span className="text-gray-500 ml-2">{formatBytes(entry.size)}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
