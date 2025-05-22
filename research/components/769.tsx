import * as LucideReact from "lucide-react";
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

  // Extract repository name from html_url
  const repoName = (() => {
    try {
      const parts = new URL(value.html_url).pathname.split("/").filter(Boolean);
      return parts[parts.length - 1] || value.vcs_url;
    } catch {
      return value.vcs_url;
    }
  })();

  // Format bytes into human-readable string
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const units = ["KB", "MB", "GB", "TB"];
    let i = 0;
    let size = bytes;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(1)} ${units[i]}`;
  };

  // Prepare project choice labels
  const choices = value.project_choices || [];
  const choiceLabels = choices
    .map((c) => c.human_name || c.vcs || c.tfvc_project)
    .filter(Boolean) as string[];
  const displayedChoices = choiceLabels.slice(0, 3);
  const moreCount = choiceLabels.length - displayedChoices.length;

  // Map import status to human-readable label, icon, and color
  const statusConfig: Record<
    string,
    { label: string; icon: JSX.Element; color: string }
  > = {
    none: {
      label: "Not started",
      icon: <LucideReact.Clock size={16} />,
      color: "text-gray-500",
    },
    auth: {
      label: "Authenticating",
      icon: <LucideReact.Lock size={16} />,
      color: "text-amber-500",
    },
    detecting: {
      label: "Detecting",
      icon: <LucideReact.Loader size={16} className="animate-spin" />,
      color: "text-blue-500",
    },
    choose: {
      label: "Selecting repository",
      icon: <LucideReact.FolderOpen size={16} />,
      color: "text-gray-500",
    },
    auth_failed: {
      label: "Authentication failed",
      icon: <LucideReact.AlertTriangle size={16} />,
      color: "text-red-500",
    },
    importing: {
      label: "Importing",
      icon: <LucideReact.Loader size={16} className="animate-spin" />,
      color: "text-blue-500",
    },
    mapping: {
      label: "Mapping",
      icon: <LucideReact.MapPin size={16} />,
      color: "text-blue-500",
    },
    waiting_to_push: {
      label: "Waiting to push",
      icon: <LucideReact.Clock size={16} />,
      color: "text-amber-500",
    },
    pushing: {
      label: "Pushing",
      icon: <LucideReact.Loader size={16} className="animate-spin" />,
      color: "text-blue-500",
    },
    complete: {
      label: "Completed",
      icon: <LucideReact.CheckCircle size={16} />,
      color: "text-green-500",
    },
    error: {
      label: "Error",
      icon: <LucideReact.AlertTriangle size={16} />,
      color: "text-red-500",
    },
    detection_found_multiple: {
      label: "Multiple repositories found",
      icon: <LucideReact.AlertTriangle size={16} />,
      color: "text-amber-500",
    },
    detection_found_nothing: {
      label: "No repository found",
      icon: <LucideReact.AlertCircle size={16} />,
      color: "text-amber-500",
    },
    detection_needs_auth: {
      label: "Authentication required",
      icon: <LucideReact.AlertTriangle size={16} />,
      color: "text-red-500",
    },
    setup: {
      label: "Setup",
      icon: <LucideReact.Settings size={16} />,
      color: "text-blue-500",
    },
    unknown: {
      label: "Unknown",
      icon: <LucideReact.HelpCircle size={16} />,
      color: "text-gray-500",
    },
  };
  const currentStatus = statusConfig[value.status] || {
    label: value.status,
    icon: <LucideReact.HelpCircle size={16} />,
    color: "text-gray-500",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header with repository name and status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LucideReact.GitPullRequest size={20} className="text-gray-700" />
          <span className="text-lg font-semibold text-gray-800 truncate">
            {repoName}
          </span>
        </div>
        <div className={`flex items-center gap-1 ${currentStatus.color}`}>
          {currentStatus.icon}
          <span className="text-sm">{currentStatus.label}</span>
        </div>
      </div>

      {/* Progress bars */}
      {(value.import_percent != null || value.push_percent != null) && (
        <div className="space-y-3 mb-4">
          {value.import_percent != null && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Import Progress</span>
                <span>{value.import_percent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${value.import_percent}%` }}
                />
              </div>
            </div>
          )}
          {value.push_percent != null && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Push Progress</span>
                <span>{value.push_percent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${value.push_percent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
        {value.commit_count != null && (
          <div className="flex items-center gap-1">
            <LucideReact.GitCommit size={16} className="text-gray-500" />
            <span>{value.commit_count} commits</span>
          </div>
        )}
        {value.authors_count != null && (
          <div className="flex items-center gap-1">
            <LucideReact.Users size={16} className="text-gray-500" />
            <span>{value.authors_count} authors</span>
          </div>
        )}
        {value.has_large_files && value.large_files_count != null && (
          <div className="flex items-center gap-1">
            <LucideReact.AlertTriangle size={16} className="text-red-500" />
            <span>
              {value.large_files_count} large file
              {value.large_files_count > 1 ? "s" : ""} (
              {value.large_files_size != null
                ? formatBytes(value.large_files_size)
                : "unknown size"}
              )
            </span>
          </div>
        )}
        {choiceLabels.length > 0 && (
          <div className="col-span-2 flex flex-wrap items-center gap-1">
            <LucideReact.Tag size={16} className="text-blue-500" />
            {displayedChoices.map((label, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
              >
                {label}
              </span>
            ))}
            {moreCount > 0 && (
              <span className="text-xs text-gray-500">+{moreCount} more</span>
            )}
          </div>
        )}
      </div>

      {/* URLs */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Link size={16} />
          <span className="truncate" title={value.html_url}>
            {value.html_url}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Server size={16} />
          <span className="truncate" title={value.repository_url}>
            {value.repository_url}
          </span>
        </div>
      </div>

      {/* Error or status text */}
      {value.error_message && (
        <div className="mt-4 p-2 bg-red-50 text-red-700 text-sm rounded flex items-center gap-2">
          <LucideReact.AlertTriangle size={16} />
          <span>{value.error_message}</span>
        </div>
      )}
      {!value.error_message && value.status_text && (
        <div className="mt-4 p-2 bg-gray-50 text-gray-700 text-sm rounded">
          {value.status_text}
        </div>
      )}
    </div>
  );
}
