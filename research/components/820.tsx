import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * @title GitHub Pages deployment status
   */
  export type pages_deployment_status = {
    /**
     * The current status of the deployment.
     */
    status?:
      | "deployment_in_progress"
      | "syncing_files"
      | "finished_file_sync"
      | "updating_pages"
      | "purging_cdn"
      | "deployment_cancelled"
      | "deployment_failed"
      | "deployment_content_failed"
      | "deployment_attempt_error"
      | "deployment_lost"
      | "succeed";
  };
}
export type AutoViewInput = AutoViewInputSubTypes.pages_deployment_status;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  type StatusKey = NonNullable<AutoViewInput["status"]>;
  const statusMap: Record<string, { label: string; icon: JSX.Element }> = {
    deployment_in_progress: {
      label: "Deployment in progress",
      icon: (
        <LucideReact.Clock
          size={20}
          className="text-amber-500"
          strokeWidth={1.5}
          aria-label="Deployment in progress"
        />
      ),
    },
    syncing_files: {
      label: "Syncing files",
      icon: (
        <LucideReact.Loader
          size={20}
          className="animate-spin text-blue-500"
          strokeWidth={1.5}
          aria-label="Syncing files"
        />
      ),
    },
    finished_file_sync: {
      label: "Files synced",
      icon: (
        <LucideReact.CheckCircle
          size={20}
          className="text-green-500"
          strokeWidth={1.5}
          aria-label="Files synced"
        />
      ),
    },
    updating_pages: {
      label: "Updating pages",
      icon: (
        <LucideReact.Clock
          size={20}
          className="text-amber-500"
          strokeWidth={1.5}
          aria-label="Updating pages"
        />
      ),
    },
    purging_cdn: {
      label: "Purging CDN",
      icon: (
        <LucideReact.Clock
          size={20}
          className="text-amber-500"
          strokeWidth={1.5}
          aria-label="Purging CDN"
        />
      ),
    },
    deployment_cancelled: {
      label: "Deployment cancelled",
      icon: (
        <LucideReact.XCircle
          size={20}
          className="text-red-500"
          strokeWidth={1.5}
          aria-label="Deployment cancelled"
        />
      ),
    },
    deployment_failed: {
      label: "Deployment failed",
      icon: (
        <LucideReact.AlertTriangle
          size={20}
          className="text-red-500"
          strokeWidth={1.5}
          aria-label="Deployment failed"
        />
      ),
    },
    deployment_content_failed: {
      label: "Content failed",
      icon: (
        <LucideReact.AlertTriangle
          size={20}
          className="text-red-500"
          strokeWidth={1.5}
          aria-label="Content deployment failed"
        />
      ),
    },
    deployment_attempt_error: {
      label: "Attempt error",
      icon: (
        <LucideReact.AlertTriangle
          size={20}
          className="text-red-500"
          strokeWidth={1.5}
          aria-label="Deployment attempt error"
        />
      ),
    },
    deployment_lost: {
      label: "Deployment lost",
      icon: (
        <LucideReact.AlertTriangle
          size={20}
          className="text-red-500"
          strokeWidth={1.5}
          aria-label="Deployment lost"
        />
      ),
    },
    succeed: {
      label: "Deployment succeeded",
      icon: (
        <LucideReact.CheckCircle
          size={20}
          className="text-green-500"
          strokeWidth={1.5}
          aria-label="Deployment succeeded"
        />
      ),
    },
  };

  const defaultInfo = {
    label: "Unknown status",
    icon: (
      <LucideReact.AlertCircle
        size={20}
        className="text-gray-400"
        strokeWidth={1.5}
        aria-label="Unknown status"
      />
    ),
  };

  const info = statusMap[value.status as StatusKey] ?? defaultInfo;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-sm">
      {info.icon}
      <span className="text-gray-800 font-medium">{info.label}</span>
    </div>
  );
}
