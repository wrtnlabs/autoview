import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Diff Entry
     *
     * @title Diff Entry
    */
    export type diff_entry = {
        sha: string;
        filename: string;
        status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
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

  const statusStyles: Record<AutoViewInputSubTypes.diff_entry["status"], string> = {
    added:    "bg-green-100 text-green-800",
    removed:  "bg-red-100 text-red-800",
    modified: "bg-yellow-100 text-yellow-800",
    renamed:  "bg-blue-100 text-blue-800",
    copied:   "bg-teal-100 text-teal-800",
    changed:  "bg-purple-100 text-purple-800",
    unchanged:"bg-gray-100 text-gray-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Code Changes</h2>
      <p className="text-sm text-gray-500 mb-4">
        {totalFiles} file{totalFiles !== 1 ? "s" : ""} changed &middot;{" "}
        <span className="text-green-600">+{totalAdditions}</span> &middot;{" "}
        <span className="text-red-600">-{totalDeletions}</span>
      </p>
      <ul className="space-y-4">
        {value.map((entry) => {
          const badgeStyle = statusStyles[entry.status];
          const displayFilename =
            entry.status === "renamed" && entry.previous_filename
              ? `${entry.previous_filename} → ${entry.filename}`
              : entry.filename;
          const formattedStatus =
            entry.status.charAt(0).toUpperCase() + entry.status.slice(1);

          return (
            <li
              key={entry.sha}
              className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-gray-900 truncate">
                  {displayFilename}
                </p>
                <p className="text-sm text-gray-500 mt-1">SHA: {entry.sha}</p>
              </div>
              <div className="flex items-center mt-3 sm:mt-0 sm:ml-4 space-x-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${badgeStyle}`}>
                  {formattedStatus}
                </span>
                <span className="text-sm text-green-600">+{entry.additions}</span>
                <span className="text-sm text-red-600">-{entry.deletions}</span>
              </div>
              {entry.patch && (
                <pre className="mt-3 bg-gray-100 text-gray-700 text-sm font-mono p-2 rounded max-h-24 overflow-y-auto w-full sm:w-auto">
                  {entry.patch}
                </pre>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
  // 3. Return the React element.
}
