import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Results of a successful merge upstream request
     *
     * @title Merged upstream
    */
    export interface merged_upstream {
        message?: string;
        merge_type?: "merge" | "fast-forward" | "none";
        base_branch?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.merged_upstream;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const mergeType: "merge" | "fast-forward" | "none" = value.merge_type ?? "none";

  const mergeLabels: Record<"merge" | "fast-forward" | "none", string> = {
    merge: "Merged",
    "fast-forward": "Fast-Forwarded",
    none: "No Merge",
  };
  const displayLabel = mergeLabels[mergeType];

  // Select appropriate icon and color based on merge type
  let StatusIcon = LucideReact.CheckCircle;
  let statusColor = "text-green-500";
  if (mergeType === "fast-forward") {
    StatusIcon = LucideReact.FastForward;
    statusColor = "text-blue-500";
  } else if (mergeType === "none") {
    StatusIcon = LucideReact.Clock;
    statusColor = "text-gray-400";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <StatusIcon className={statusColor} size={20} strokeWidth={2} />
        <h2 className="text-lg font-semibold text-gray-800">{displayLabel}</h2>
      </div>

      {value.base_branch && (
        <div className="mt-3 flex items-center text-gray-600">
          <LucideReact.GitBranch className="mr-1" size={16} />
          <span className="text-sm truncate">Base branch: {value.base_branch}</span>
        </div>
      )}

      {value.message && (
        <div className="mt-3 flex items-start text-gray-700">
          <LucideReact.MessageSquare className="mt-0.5 mr-1 text-gray-400" size={16} />
          <p className="text-sm leading-relaxed line-clamp-3">{value.message}</p>
        </div>
      )}

      {mergeType === "none" && !value.base_branch && !value.message && (
        <div className="mt-4 flex items-center text-gray-400">
          <LucideReact.AlertCircle className="mr-1" size={16} />
          <span className="text-sm">No merge information available.</span>
        </div>
      )}
    </div>
  );
}
