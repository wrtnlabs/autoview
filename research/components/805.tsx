import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Results of a successful merge upstream request
     *
     * @title Merged upstream
    */
    export type merged_upstream = {
        message?: string;
        merge_type?: "merge" | "fast-forward" | "none";
        base_branch?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.merged_upstream;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const mergeTypeMap: Record<'merge' | 'fast-forward' | 'none', { label: string; badgeClass: string }> = {
    merge: {
      label: 'Merged',
      badgeClass: 'bg-green-100 text-green-800',
    },
    'fast-forward': {
      label: 'Fast-forwarded',
      badgeClass: 'bg-blue-100 text-blue-800',
    },
    none: {
      label: 'No merge',
      badgeClass: 'bg-gray-100 text-gray-800',
    },
  };

  const mergeKey = value.merge_type ?? 'none';
  const { label: mergeLabel, badgeClass } = mergeTypeMap[mergeKey as 'merge' | 'fast-forward' | 'none'];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${badgeClass}`}
        >
          {mergeLabel}
        </span>
        {value.base_branch && (
          <span className="text-sm text-gray-500">
            Base:
            <span className="ml-1 font-medium text-gray-700">
              {value.base_branch}
            </span>
          </span>
        )}
      </div>
      {value.message && (
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {value.message}
        </p>
      )}
    </div>
  );
}
