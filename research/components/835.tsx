import React from "react";
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
  const statusLabel = value.merged ? 'Merged' : 'Merge Failed';
  const statusClasses = value.merged
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses}`}
          aria-label={statusLabel}
        >
          {statusLabel}
        </span>
        <code
          className="text-xs font-mono text-gray-500 truncate"
          title={value.sha}
        >
          {shortSha}
        </code>
      </div>
      <p
        className="text-sm text-gray-700 line-clamp-2"
        title={value.message}
      >
        {value.message}
      </p>
    </div>
  );
}
