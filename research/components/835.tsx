import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Pull Request Merge Result
     *
     * @title Pull Request Merge Result
    */
    export interface pull_request_merge_result {
        sha: string;
        merged: boolean;
        message: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.pull_request_merge_result;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const shortSha = value.sha.slice(0, 7);
  const isMerged = value.merged;
  const statusText = isMerged ? "Merged" : "Merge Failed";
  const statusIcon = isMerged ? (
    <LucideReact.CheckCircle size={16} className="text-green-500" />
  ) : (
    <LucideReact.XCircle size={16} className="text-red-500" />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        {statusIcon}
        <span className="ml-2 text-gray-800 font-semibold">{statusText}</span>
      </div>
      <div className="flex items-center mb-3 text-gray-500 text-sm">
        <LucideReact.Code size={16} className="text-gray-400" />
        <span className="ml-1 font-mono truncate">{shortSha}</span>
      </div>
      <p className="text-gray-700 text-sm line-clamp-3 break-words">
        {value.message}
      </p>
    </div>
  );
}
