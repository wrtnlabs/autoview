import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Diff Entry
   *
   * @title Diff Entry
   */
  export type diff_entry = {
    sha: string;
    filename: string;
    status:
      | "added"
      | "removed"
      | "modified"
      | "renamed"
      | "copied"
      | "changed"
      | "unchanged";
    additions: number & tags.Type<"int32">;
    deletions: number & tags.Type<"int32">;
    changes: number & tags.Type<"int32">;
    blob_url: string & tags.Format<"uri">;
    raw_url: string & tags.Format<"uri">;
    contents_url: string & tags.Format<"uri">;
    patch?: string;
    previous_filename?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.diff_entry[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalFiles = value.length;
  const totalAdditions = value.reduce((sum, entry) => sum + entry.additions, 0);
  const totalDeletions = value.reduce((sum, entry) => sum + entry.deletions, 0);

  // Helper to select an icon based on diff status
  const getStatusIcon = (
    status: AutoViewInputSubTypes.diff_entry["status"],
  ) => {
    switch (status) {
      case "added":
        return <LucideReact.FilePlus className="text-green-500" size={16} />;
      case "removed":
        return <LucideReact.FileMinus className="text-red-500" size={16} />;
      case "modified":
        return <LucideReact.Edit2 className="text-blue-500" size={16} />;
      case "renamed":
        return <LucideReact.ArrowRight className="text-amber-500" size={16} />;
      case "copied":
        return <LucideReact.Copy className="text-indigo-500" size={16} />;
      case "changed":
        return <LucideReact.RefreshCw className="text-gray-500" size={16} />;
      default:
        return <LucideReact.EyeOff className="text-gray-400" size={16} />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (totalFiles === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-lg">No changes detected</span>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
        <div className="flex items-center text-gray-600">
          <LucideReact.FileText className="mr-2" size={16} />
          <span>
            {totalFiles} file{totalFiles !== 1 ? "s" : ""} changed
          </span>
        </div>
        <div className="flex items-center mt-2 sm:mt-0">
          <span className="text-green-600 font-semibold mr-4">
            +{totalAdditions}
          </span>
          <span className="text-red-600 font-semibold">-{totalDeletions}</span>
        </div>
      </div>

      {/* File list */}
      <ul className="divide-y divide-gray-200">
        {value.map((entry) => (
          <li
            key={entry.sha}
            className="flex justify-between items-center py-2"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              {getStatusIcon(entry.status)}
              {entry.status === "renamed" && entry.previous_filename ? (
                <div className="flex items-center text-gray-700 truncate">
                  <span className="line-through text-sm text-gray-500 truncate">
                    {entry.previous_filename}
                  </span>
                  <LucideReact.ArrowRight
                    className="mx-1 text-gray-400"
                    size={12}
                  />
                  <span className="font-medium text-sm truncate">
                    {entry.filename}
                  </span>
                </div>
              ) : (
                <span className="font-medium text-sm text-gray-700 truncate">
                  {entry.filename}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-500 text-sm font-medium">
                +{entry.additions}
              </span>
              <span className="text-red-500 text-sm font-medium">
                -{entry.deletions}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  // 3. Return the React element.
}
