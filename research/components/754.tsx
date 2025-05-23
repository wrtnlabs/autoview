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
  // 1. Derived values and helper functions
  const displaySha = value.sha.slice(0, 7) + (value.sha.length > 7 ? "…" : "");
  const entryCount = value.tree.length;
  const maxDisplay = 10;
  const entriesToShow = value.tree.slice(0, maxDisplay);
  const remainingCount = entryCount > maxDisplay ? entryCount - maxDisplay : 0;
  const formatSize = (size: number): string =>
    size < 1024 ? `${size} B` : `${(size / 1024).toFixed(1)} KB`;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <LucideReact.GitBranch size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Git Tree Overview</h2>
        </div>
        {value.truncated ? (
          <LucideReact.AlertTriangle size={20} className="text-amber-500" />
        ) : (
          <LucideReact.CheckCircle size={20} className="text-green-500" />
        )}
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-600 mb-4 space-y-1">
        <div>
          <span className="font-medium">SHA:</span> {displaySha}
        </div>
        <div>
          <span className="font-medium">Entries:</span> {entryCount}
        </div>
      </div>

      {/* Entries List */}
      <div className="divide-y divide-gray-100 border-t border-b border-gray-200">
        {entriesToShow.map((item, idx) => (
          <div
            key={`${item.sha}-${idx}`}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center space-x-2 truncate">
              {item.type === "tree" ? (
                <LucideReact.Folder size={16} className="text-blue-500 flex-shrink-0" />
              ) : (
                <LucideReact.FileText size={16} className="text-gray-500 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 truncate">{item.path}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {item.size != null && <span>{formatSize(item.size)}</span>}
              {item.url && <LucideReact.Link size={14} className="text-gray-400" />}
            </div>
          </div>
        ))}
      </div>

      {/* Remaining count indicator */}
      {remainingCount > 0 && (
        <div className="mt-2 text-sm text-gray-500">
          +{remainingCount} more item{remainingCount > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
