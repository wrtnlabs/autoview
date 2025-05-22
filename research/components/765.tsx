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
  const repoName = React.useMemo(() => {
    try {
      const parts = value.vcs_url.split("/").filter(Boolean);
      return parts[parts.length - 1] || value.vcs_url;
    } catch {
      return value.vcs_url;
    }
  }, [value.vcs_url]);

  const statusInfo = React.useMemo(() => {
    switch (value.status) {
      case "complete":
        return {
          label: "Complete",
          icon: (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ),
        };
      case "error":
      case "auth_failed":
        return {
          label: "Error",
          icon: (
            <LucideReact.AlertTriangle size={16} className="text-red-500" />
          ),
        };
      case "importing":
      case "pushing":
      case "mapping":
      case "waiting_to_push":
        return {
          label: "In Progress",
          icon: (
            <LucideReact.Loader
              size={16}
              className="animate-spin text-blue-500"
            />
          ),
        };
      case "detecting":
      case "detection_found_multiple":
      case "detection_found_nothing":
      case "detection_needs_auth":
        return {
          label: "Detecting",
          icon: <LucideReact.Search size={16} className="text-amber-500" />,
        };
      default:
        return {
          label: "Pending",
          icon: <LucideReact.Clock size={16} className="text-amber-500" />,
        };
    }
  }, [value.status]);

  const largeFilesInfo =
    value.has_large_files && value.large_files_count != null
      ? `${value.large_files_count} files (${Math.round((value.large_files_size ?? 0) / (1024 * 1024))} MB)`
      : null;

  const projectChoicesDisplay =
    value.project_choices && value.project_choices.length > 0
      ? value.project_choices
          .map((c) => c.human_name || c.vcs || c.tfvc_project || "N/A")
          .join(", ")
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: repository name and remote URL */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {repoName}
        </h2>
        <div className="flex items-center text-sm text-gray-500 space-x-1">
          <LucideReact.Link size={16} />
          <span className="truncate">{value.vcs_url}</span>
        </div>
      </div>

      {/* Status line */}
      <div className="flex items-center space-x-2">
        {statusInfo.icon}
        <span className="text-sm font-medium text-gray-700">
          {statusInfo.label}
        </span>
      </div>

      {/* Progress bars for importing / pushing */}
      {["importing", "pushing", "mapping", "waiting_to_push"].includes(
        value.status,
      ) &&
        (value.import_percent != null || value.push_percent != null) && (
          <div className="space-y-2">
            {value.import_percent != null && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
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
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Push Progress</span>
                  <span>{value.push_percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${value.push_percent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        {value.commit_count != null && (
          <div className="flex items-center space-x-1">
            <LucideReact.GitCommit size={16} className="text-gray-500" />
            <span>{value.commit_count} commits</span>
          </div>
        )}
        {value.authors_count != null && (
          <div className="flex items-center space-x-1">
            <LucideReact.Users size={16} className="text-gray-500" />
            <span>{value.authors_count} authors</span>
          </div>
        )}
        {largeFilesInfo && (
          <div className="flex items-center space-x-1 col-span-2">
            <LucideReact.File size={16} className="text-gray-500" />
            <span>{largeFilesInfo}</span>
          </div>
        )}
        {projectChoicesDisplay && (
          <div className="flex items-start space-x-1 col-span-2">
            <LucideReact.List size={16} className="text-gray-500" />
            <span className="line-clamp-2">{projectChoicesDisplay}</span>
          </div>
        )}
      </div>

      {/* Status or error messages */}
      {(value.error_message || value.status_text || value.message) && (
        <div className="space-y-1">
          {value.error_message && (
            <div className="flex items-center space-x-1 text-red-600 text-sm">
              <LucideReact.AlertTriangle size={16} />
              <span>{value.error_message}</span>
            </div>
          )}
          {!value.error_message && value.status_text && (
            <div className="text-sm text-gray-600">{value.status_text}</div>
          )}
          {!value.error_message && !value.status_text && value.message && (
            <div className="text-sm text-gray-600">{value.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
