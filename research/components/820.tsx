import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * @title GitHub Pages deployment status
    */
    export type pages_deployment_status = {
        /**
         * The current status of the deployment.
        */
        status?: "deployment_in_progress" | "syncing_files" | "finished_file_sync" | "updating_pages" | "purging_cdn" | "deployment_cancelled" | "deployment_failed" | "deployment_content_failed" | "deployment_attempt_error" | "deployment_lost" | "succeed";
    };
}
export type AutoViewInput = AutoViewInputSubTypes.pages_deployment_status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Map raw status keys to human-readable labels
  const statusLabels: Record<string, string> = {
    deployment_in_progress: "Deployment in Progress",
    syncing_files: "Syncing Files",
    finished_file_sync: "Finished File Sync",
    updating_pages: "Updating Pages",
    purging_cdn: "Purging CDN",
    deployment_cancelled: "Cancelled",
    deployment_failed: "Failed",
    deployment_content_failed: "Content Failed",
    deployment_attempt_error: "Attempt Error",
    deployment_lost: "Lost",
    succeed: "Succeeded",
  };

  // Define status categories for styling
  const inProgressStatuses = new Set([
    "deployment_in_progress",
    "syncing_files",
    "finished_file_sync",
    "updating_pages",
    "purging_cdn",
  ]);
  const errorStatuses = new Set([
    "deployment_failed",
    "deployment_content_failed",
    "deployment_attempt_error",
    "deployment_lost",
  ]);
  const successStatuses = new Set(["succeed"]);
  const cancelledStatuses = new Set(["deployment_cancelled"]);

  // Derive display label
  const rawStatus = value.status;
  const displayLabel = rawStatus && statusLabels[rawStatus] ? statusLabels[rawStatus] : "Unknown";

  // Derive badge color classes based on status category
  const badgeBase = "px-2 py-1 text-sm font-medium rounded-full";
  let badgeColorClass = "bg-gray-100 text-gray-800";
  if (rawStatus) {
    if (inProgressStatuses.has(rawStatus)) {
      badgeColorClass = "bg-yellow-100 text-yellow-800";
    } else if (successStatuses.has(rawStatus)) {
      badgeColorClass = "bg-green-100 text-green-800";
    } else if (errorStatuses.has(rawStatus)) {
      badgeColorClass = "bg-red-100 text-red-800";
    } else if (cancelledStatuses.has(rawStatus)) {
      badgeColorClass = "bg-gray-100 text-gray-800";
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
      <div className="text-sm font-medium text-gray-700">Deployment Status</div>
      <span className={`${badgeBase} ${badgeColorClass}`} aria-label={`Status: ${displayLabel}`}>
        {displayLabel}
      </span>
    </div>
  );
}
