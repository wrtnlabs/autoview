import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Pull Request Merge Result
   *
   * @title Pull Request Merge Result
   */
  export type pull_request_merge_result = {
    sha: string;
    merged: boolean;
    message: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.pull_request_merge_result;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const shortSha = value.sha.slice(0, 7);
  const statusText = value.merged ? "Merged" : "Merge Failed";
  const statusColor = value.merged
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
  const StatusIcon = value.merged ? (
    <LucideReact.CheckCircle className="text-green-500" size={18} />
  ) : (
    <LucideReact.AlertTriangle className="text-red-500" size={18} />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        {StatusIcon}
        <span className={`font-medium ${statusColor}`}>{statusText}</span>
      </div>

      <div className="flex items-center mt-3 text-sm text-gray-500 dark:text-gray-400">
        <LucideReact.GitCommit size={16} className="mr-1" />
        <span className="font-mono">{shortSha}</span>
      </div>

      <p
        className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2"
        title={value.message}
      >
        {value.message}
      </p>
    </div>
  );
}
