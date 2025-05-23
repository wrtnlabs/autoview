import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Diff Entry
     *
     * @title Diff Entry
    */
    export interface diff_entry {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.diff_entry[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation for summary
  const totalFiles = value.length;
  const totalAdditions = value.reduce((sum, entry) => sum + entry.additions, 0);
  const totalDeletions = value.reduce((sum, entry) => sum + entry.deletions, 0);
  const totalChanges = value.reduce((sum, entry) => sum + entry.changes, 0);

  // 2. Map diff status to corresponding icon and color
  const getStatusIcon = (
    status: AutoViewInputSubTypes.diff_entry["status"]
  ): JSX.Element => {
    switch (status) {
      case "added":
        return <LucideReact.PlusCircle className="text-green-500" size={16} />;
      case "removed":
        return <LucideReact.Trash2 className="text-red-500" size={16} />;
      case "modified":
        return <LucideReact.Edit2 className="text-amber-500" size={16} />;
      case "renamed":
        return <LucideReact.ArrowRightCircle className="text-indigo-500" size={16} />;
      case "copied":
        return <LucideReact.Copy className="text-purple-500" size={16} />;
      case "changed":
        return <LucideReact.RefreshCw className="text-blue-500" size={16} />;
      case "unchanged":
        return <LucideReact.MinusCircle className="text-gray-400" size={16} />;
      default:
        return <LucideReact.MinusCircle className="text-gray-400" size={16} />;
    }
  };

  // 3. Render component
  return (
    <div className="w-full max-w-full p-4 bg-white rounded-lg shadow-sm">
      {/* Summary Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <div className="flex items-center text-gray-700 text-sm mb-2 sm:mb-0">
          <LucideReact.ListChecks size={16} className="mr-1" />
          <span>{totalFiles} file{totalFiles !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700 space-x-4">
          <div className="flex items-center">
            <LucideReact.Plus size={16} className="text-green-500 mr-1" />
            <span>{totalAdditions}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Minus size={16} className="text-red-500 mr-1" />
            <span>{totalDeletions}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.RefreshCw size={16} className="text-blue-500 mr-1" />
            <span>{totalChanges}</span>
          </div>
        </div>
      </div>

      {/* Diff Entry List */}
      <div className="divide-y divide-gray-200">
        {value.map((entry) => (
          <div
            key={entry.sha + entry.filename}
            className="py-2 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
          >
            {/* File Info */}
            <div className="flex items-center w-full sm:w-1/2 overflow-hidden">
              <LucideReact.FileText size={20} className="text-gray-500 mr-2" />
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium text-gray-800 truncate">
                  {entry.filename}
                </span>
                {entry.status === "renamed" && entry.previous_filename && (
                  <span className="text-gray-500 text-sm truncate">
                    renamed from {entry.previous_filename}
                  </span>
                )}
              </div>
            </div>

            {/* Status & Counts */}
            <div className="flex items-center mt-2 sm:mt-0 space-x-4">
              <div className="flex items-center">
                {getStatusIcon(entry.status)}
                <span className="ml-1 text-gray-600 text-sm capitalize">
                  {entry.status}
                </span>
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <LucideReact.Plus size={14} className="mr-1" />
                <span>{entry.additions}</span>
              </div>
              <div className="flex items-center text-red-600 text-sm">
                <LucideReact.Minus size={14} className="mr-1" />
                <span>{entry.deletions}</span>
              </div>
              <div className="flex items-center text-blue-600 text-sm">
                <LucideReact.RefreshCw size={14} className="mr-1" />
                <span>{entry.changes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
