import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * @title GitHub Pages deployment status
    */
    export interface pages_deployment_status {
        /**
         * The current status of the deployment.
        */
        status?: "deployment_in_progress" | "syncing_files" | "finished_file_sync" | "updating_pages" | "purging_cdn" | "deployment_cancelled" | "deployment_failed" | "deployment_content_failed" | "deployment_attempt_error" | "deployment_lost" | "succeed";
    }
}
export type AutoViewInput = AutoViewInputSubTypes.pages_deployment_status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  type StatusKey = NonNullable<AutoViewInputSubTypes.pages_deployment_status["status"]>;

  interface StatusConfig {
    label: string;
    Icon: React.FC<any>;
    colorClass: string;
    spin?: boolean;
  }

  const statusMap: Record<StatusKey, StatusConfig> = {
    deployment_in_progress: {
      label: "Deployment In Progress",
      Icon: LucideReact.Loader,
      colorClass: "text-blue-500",
      spin: true,
    },
    syncing_files: {
      label: "Syncing Files",
      Icon: LucideReact.RefreshCw,
      colorClass: "text-indigo-500",
      spin: true,
    },
    finished_file_sync: {
      label: "Files Synced",
      Icon: LucideReact.CheckCircle,
      colorClass: "text-green-500",
    },
    updating_pages: {
      label: "Updating Pages",
      Icon: LucideReact.RefreshCw,
      colorClass: "text-blue-400",
      spin: true,
    },
    purging_cdn: {
      label: "Purging CDN",
      Icon: LucideReact.Trash2,
      colorClass: "text-orange-500",
    },
    deployment_cancelled: {
      label: "Deployment Cancelled",
      Icon: LucideReact.XCircle,
      colorClass: "text-gray-500",
    },
    deployment_failed: {
      label: "Deployment Failed",
      Icon: LucideReact.AlertTriangle,
      colorClass: "text-red-500",
    },
    deployment_content_failed: {
      label: "Content Sync Failed",
      Icon: LucideReact.AlertTriangle,
      colorClass: "text-red-500",
    },
    deployment_attempt_error: {
      label: "Attempt Error",
      Icon: LucideReact.AlertTriangle,
      colorClass: "text-red-500",
    },
    deployment_lost: {
      label: "Deployment Lost",
      Icon: LucideReact.HelpCircle,
      colorClass: "text-yellow-500",
    },
    succeed: {
      label: "Deployment Succeeded",
      Icon: LucideReact.CheckCircle,
      colorClass: "text-green-500",
    },
  };

  // Determine configuration for the current status, or default if unknown
  const key = value.status as StatusKey | undefined;
  const cfg: StatusConfig = key && statusMap[key]
    ? statusMap[key]
    : {
        label: "Unknown Status",
        Icon: LucideReact.AlertCircle,
        colorClass: "text-gray-400",
      };

  const StatusIcon = cfg.Icon;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
      <StatusIcon
        size={20}
        strokeWidth={2}
        className={`${cfg.colorClass} ${cfg.spin ? "animate-spin" : ""}`}
        aria-label={cfg.label}
      />
      <span className="text-sm font-medium text-gray-700">{cfg.label}</span>
    </div>
  );
}
