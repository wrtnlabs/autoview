import LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  const mergeType = value.merge_type ?? "unknown";
  const mergeLabels: Record<string, string> = {
    merge: "Merged",
    "fast-forward": "Fast-forwarded",
    none: "No merge",
    unknown: "Unknown",
  };
  const mergeLabel = mergeLabels[mergeType] || mergeLabels.unknown;

  // Select appropriate icon for merge type
  let mergeIcon: JSX.Element;
  if (mergeType === "merge") {
    mergeIcon = (
      <LucideReact.CheckCircle
        className="text-green-500"
        size={16}
        aria-label="Merged"
      />
    );
  } else if (mergeType === "fast-forward") {
    mergeIcon = (
      <LucideReact.FastForward
        className="text-blue-500"
        size={16}
        aria-label="Fast-forwarded"
      />
    );
  } else if (mergeType === "none") {
    mergeIcon = (
      <LucideReact.AlertTriangle
        className="text-yellow-500"
        size={16}
        aria-label="No merge"
      />
    );
  } else {
    mergeIcon = (
      <LucideReact.HelpCircle
        className="text-gray-400"
        size={16}
        aria-label="Unknown merge status"
      />
    );
  }

  // Derive branch display
  const branchName = value.base_branch?.trim() || "Unknown branch";

  // Prepare optional message
  const message = value.message?.trim();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        {mergeIcon}
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          {mergeLabel}
        </h2>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <LucideReact.GitBranch
          className="text-gray-500"
          size={16}
          aria-label="Base branch"
        />
        <span className="ml-1 truncate">{branchName}</span>
      </div>
      {message && (
        <div className="flex items-start text-sm text-gray-700">
          <LucideReact.MessageSquare
            className="text-gray-500 mt-1"
            size={16}
            aria-label="Merge message"
          />
          <p className="ml-1 line-clamp-3 break-words">{message}</p>
        </div>
      )}
    </div>
  );
}
