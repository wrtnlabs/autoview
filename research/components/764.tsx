import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A repository import from an external source.
   *
   * @title Import
   */
  export type _import = {
    vcs: string | null;
    use_lfs?: boolean;
    /**
     * The URL of the originating repository.
     */
    vcs_url: string;
    svc_root?: string;
    tfvc_project?: string;
    status:
      | "auth"
      | "error"
      | "none"
      | "detecting"
      | "choose"
      | "auth_failed"
      | "importing"
      | "mapping"
      | "waiting_to_push"
      | "pushing"
      | "complete"
      | "setup"
      | "unknown"
      | "detection_found_multiple"
      | "detection_found_nothing"
      | "detection_needs_auth";
    status_text?: string | null;
    failed_step?: string | null;
    error_message?: string | null;
    import_percent?: (number & tags.Type<"int32">) | null;
    commit_count?: (number & tags.Type<"int32">) | null;
    push_percent?: (number & tags.Type<"int32">) | null;
    has_large_files?: boolean;
    large_files_size?: number & tags.Type<"int32">;
    large_files_count?: number & tags.Type<"int32">;
    project_choices?: {
      vcs?: string;
      tfvc_project?: string;
      human_name?: string;
    }[];
    message?: string;
    authors_count?: (number & tags.Type<"int32">) | null;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    authors_url: string & tags.Format<"uri">;
    repository_url: string & tags.Format<"uri">;
    svn_root?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes._import;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Map status to human label, icon, and color class
  const statusInfo = (() => {
    switch (value.status) {
      case "complete":
        return {
          label: "Complete",
          icon: (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ),
          colorClass: "text-green-600",
        };
      case "error":
      case "auth_failed":
        return {
          label: "Error",
          icon: (
            <LucideReact.AlertTriangle className="text-red-500" size={16} />
          ),
          colorClass: "text-red-600",
        };
      case "importing":
      case "mapping":
        return {
          label: value.status.charAt(0).toUpperCase() + value.status.slice(1),
          icon: (
            <LucideReact.Loader
              className="animate-spin text-blue-500"
              size={16}
            />
          ),
          colorClass: "text-blue-600",
        };
      case "pushing":
        return {
          label: "Pushing",
          icon: (
            <LucideReact.Loader
              className="animate-spin text-amber-500"
              size={16}
            />
          ),
          colorClass: "text-amber-600",
        };
      case "detecting":
        return {
          label: "Detecting",
          icon: <LucideReact.Search className="text-gray-500" size={16} />,
          colorClass: "text-gray-600",
        };
      case "waiting_to_push":
        return {
          label: "Waiting to Push",
          icon: <LucideReact.Clock className="text-amber-500" size={16} />,
          colorClass: "text-amber-600",
        };
      default:
        return {
          label: value.status
            .split("_")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          icon: <LucideReact.HelpCircle className="text-gray-500" size={16} />,
          colorClass: "text-gray-600",
        };
    }
  })();

  // Convert large file size (bytes) to MB with two decimals
  const largeFilesMB =
    value.large_files_size != null
      ? (value.large_files_size / (1024 * 1024)).toFixed(2)
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Header: VCS type and status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LucideReact.GitBranch className="text-gray-500" size={20} />
          <span className="font-semibold text-lg">
            {value.vcs ?? "Repository"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {statusInfo.icon}
          <span className={`ml-1 ${statusInfo.colorClass} font-medium`}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Repository URL */}
      <div className="flex items-center gap-1 text-sm text-gray-600 break-all mb-4">
        <LucideReact.Link size={16} />
        <span>{value.vcs_url}</span>
      </div>

      {/* Import progress bar */}
      {value.import_percent != null && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Import Progress</span>
            <span>{value.import_percent}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${value.import_percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Push progress bar */}
      {value.push_percent != null && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Push Progress</span>
            <span>{value.push_percent}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${value.push_percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Summary metrics */}
      <div className="flex flex-wrap text-sm text-gray-700 gap-4 mb-4">
        {value.commit_count != null && (
          <div className="flex items-center gap-1">
            <LucideReact.GitCommit className="text-gray-500" size={16} />
            <span>{value.commit_count} commits</span>
          </div>
        )}
        {value.authors_count != null && (
          <div className="flex items-center gap-1">
            <LucideReact.Users className="text-gray-500" size={16} />
            <span>{value.authors_count} authors</span>
          </div>
        )}
        {value.has_large_files && (
          <div className="flex items-center gap-1">
            <LucideReact.Archive className="text-gray-500" size={16} />
            <span>{value.large_files_count ?? 0} files</span>
          </div>
        )}
        {value.has_large_files && largeFilesMB && (
          <div className="flex items-center gap-1">
            <LucideReact.Database className="text-gray-500" size={16} />
            <span>{largeFilesMB} MB</span>
          </div>
        )}
        {value.project_choices && value.project_choices.length > 0 && (
          <div className="flex items-center gap-1">
            <LucideReact.List className="text-gray-500" size={16} />
            <span>{value.project_choices.length} project choices</span>
          </div>
        )}
      </div>

      {/* Error message */}
      {value.error_message && (
        <div className="p-3 bg-red-50 text-red-700 rounded text-sm flex items-start gap-2">
          <LucideReact.AlertTriangle size={16} />
          <span>{value.error_message}</span>
        </div>
      )}
    </div>
  );
}
