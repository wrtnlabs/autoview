import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A repository import from an external source.
     *
     * @title Import
    */
    export interface _import {
        vcs: string | null;
        use_lfs?: boolean;
        /**
         * The URL of the originating repository.
        */
        vcs_url: string;
        svc_root?: string;
        tfvc_project?: string;
        status: "auth" | "error" | "none" | "detecting" | "choose" | "auth_failed" | "importing" | "mapping" | "waiting_to_push" | "pushing" | "complete" | "setup" | "unknown" | "detection_found_multiple" | "detection_found_nothing" | "detection_needs_auth";
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes._import;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Map import status to display label, icon, and color
  const statusMap: Record<
    AutoViewInput["status"],
    { label: string; icon: JSX.Element; color: string }
  > = {
    auth: {
      label: "Authentication Required",
      icon: <LucideReact.AlertTriangle size={20} className="text-yellow-500" />,
      color: "text-yellow-600",
    },
    none: {
      label: "Not Started",
      icon: <LucideReact.Info size={20} className="text-gray-500" />,
      color: "text-gray-600",
    },
    detecting: {
      label: "Detecting",
      icon: <LucideReact.Clock size={20} className="text-amber-500" />,
      color: "text-amber-600",
    },
    choose: {
      label: "Choosing Repository",
      icon: <LucideReact.Info size={20} className="text-blue-500" />,
      color: "text-blue-600",
    },
    auth_failed: {
      label: "Authentication Failed",
      icon: <LucideReact.AlertTriangle size={20} className="text-red-500" />,
      color: "text-red-600",
    },
    error: {
      label: "Error",
      icon: <LucideReact.AlertTriangle size={20} className="text-red-500" />,
      color: "text-red-600",
    },
    importing: {
      label: "Importing",
      icon: <LucideReact.Loader size={20} className="animate-spin text-blue-500" />,
      color: "text-blue-600",
    },
    mapping: {
      label: "Mapping",
      icon: <LucideReact.Loader size={20} className="animate-spin text-blue-500" />,
      color: "text-blue-600",
    },
    waiting_to_push: {
      label: "Waiting to Push",
      icon: <LucideReact.Clock size={20} className="text-amber-500" />,
      color: "text-amber-600",
    },
    pushing: {
      label: "Pushing",
      icon: <LucideReact.Loader size={20} className="animate-spin text-blue-500" />,
      color: "text-blue-600",
    },
    complete: {
      label: "Complete",
      icon: <LucideReact.CheckCircle size={20} className="text-green-500" />,
      color: "text-green-600",
    },
    setup: {
      label: "Setup",
      icon: <LucideReact.Info size={20} className="text-blue-500" />,
      color: "text-blue-600",
    },
    unknown: {
      label: "Unknown Status",
      icon: <LucideReact.Info size={20} className="text-gray-500" />,
      color: "text-gray-600",
    },
    detection_found_multiple: {
      label: "Multiple Repos Found",
      icon: <LucideReact.Info size={20} className="text-yellow-500" />,
      color: "text-yellow-600",
    },
    detection_found_nothing: {
      label: "No Repository Found",
      icon: <LucideReact.Info size={20} className="text-yellow-500" />,
      color: "text-yellow-600",
    },
    detection_needs_auth: {
      label: "Authentication Needed",
      icon: <LucideReact.AlertTriangle size={20} className="text-red-500" />,
      color: "text-red-600",
    },
  };

  const currentStatus = statusMap[value.status] || statusMap.unknown;

  const importPercent =
    typeof value.import_percent === "number" ? value.import_percent : null;
  const pushPercent =
    typeof value.push_percent === "number" ? value.push_percent : null;

  const largeFilesSizeMB =
    typeof value.large_files_size === "number"
      ? (value.large_files_size / 1024 / 1024).toFixed(1)
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <div className="flex items-center">
          {currentStatus.icon}
          <span className={`${currentStatus.color} ml-2 font-medium`}>
            {currentStatus.label}
          </span>
        </div>
        <div
          className="flex items-center text-sm text-gray-500 truncate sm:ml-4"
          title={value.vcs_url}
        >
          <LucideReact.Link size={16} className="text-gray-400 mr-1" />
          <span className="truncate">{value.vcs_url}</span>
        </div>
      </div>

      {/* Progress Bars */}
      {importPercent !== null && (
        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">Import Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2"
              style={{ width: `${importPercent}%` }}
            />
          </div>
        </div>
      )}
      {pushPercent !== null && (
        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">Push Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-500 h-2"
              style={{ width: `${pushPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
        {typeof value.commit_count === "number" && (
          <div className="flex items-center">
            <LucideReact.GitCommit size={16} className="text-gray-500 mr-1" />
            <span>{value.commit_count} commits</span>
          </div>
        )}
        {typeof value.authors_count === "number" && (
          <div className="flex items-center">
            <LucideReact.Users size={16} className="text-gray-500 mr-1" />
            <span>{value.authors_count} authors</span>
          </div>
        )}
        {typeof value.has_large_files === "boolean" && (
          <div className="flex items-center">
            <LucideReact.FileArchive
              size={16}
              className="text-gray-500 mr-1"
            />
            <span>
              {value.has_large_files ? "Has large files" : "No large files"}
            </span>
          </div>
        )}
        {typeof value.large_files_count === "number" && (
          <div className="flex items-center">
            <LucideReact.File size={16} className="text-gray-500 mr-1" />
            <span>
              {value.large_files_count} files
              {largeFilesSizeMB && ` (${largeFilesSizeMB} MB)`}
            </span>
          </div>
        )}
      </div>

      {/* Messages */}
      {value.status_text && (
        <div className="text-sm text-gray-800 mb-2">{value.status_text}</div>
      )}
      {value.error_message && (
        <div className="text-sm text-red-600 mb-2 flex items-center">
          <LucideReact.AlertTriangle
            size={16}
            className="inline-block mr-1"
          />
          <span>{value.error_message}</span>
        </div>
      )}

      {/* Repository Link */}
      <div className="text-sm text-gray-500 flex items-center truncate">
        <LucideReact.Github size={16} className="text-gray-400 mr-1" />
        <span className="truncate" title={value.html_url}>
          {value.html_url}
        </span>
      </div>
    </div>
  );
}
