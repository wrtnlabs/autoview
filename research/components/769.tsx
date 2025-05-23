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
  type IconComponent = React.ComponentType<{
    size?: number;
    className?: string;
    color?: string;
    strokeWidth?: number;
    title?: string;
  }>;
  const statusMapping: Record<
    AutoViewInput["status"],
    { label: string; Icon: IconComponent; colorClass: string }
  > = {
    none: { label: "Not Started", Icon: LucideReact.Circle, colorClass: "text-gray-500" },
    setup: { label: "Setup", Icon: LucideReact.Settings, colorClass: "text-indigo-500" },
    auth: { label: "Authenticating", Icon: LucideReact.Key, colorClass: "text-purple-500" },
    auth_failed: { label: "Auth Failed", Icon: LucideReact.XCircle, colorClass: "text-red-500" },
    choose: { label: "Choose Project", Icon: LucideReact.List, colorClass: "text-indigo-600" },
    detecting: { label: "Detecting Repos", Icon: LucideReact.Search, colorClass: "text-amber-500" },
    detection_found_multiple: {
      label: "Multiple Found",
      Icon: LucideReact.Users,
      colorClass: "text-amber-600",
    },
    detection_found_nothing: {
      label: "No Repos Found",
      Icon: LucideReact.EyeOff,
      colorClass: "text-gray-400",
    },
    detection_needs_auth: {
      label: "Detection Needs Auth",
      Icon: LucideReact.Lock,
      colorClass: "text-purple-600",
    },
    importing: {
      label: "Importing",
      Icon: LucideReact.DownloadCloud,
      colorClass: "text-blue-500",
    },
    mapping: { label: "Mapping", Icon: LucideReact.Map, colorClass: "text-teal-500" },
    waiting_to_push: {
      label: "Waiting to Push",
      Icon: LucideReact.Clock,
      colorClass: "text-amber-500",
    },
    pushing: {
      label: "Pushing",
      Icon: LucideReact.UploadCloud,
      colorClass: "text-blue-600",
    },
    complete: { label: "Complete", Icon: LucideReact.CheckCircle, colorClass: "text-green-500" },
    error: { label: "Error", Icon: LucideReact.AlertTriangle, colorClass: "text-red-500" },
    unknown: { label: "Unknown", Icon: LucideReact.HelpCircle, colorClass: "text-gray-400" },
  };
  const statusInfo =
    statusMapping[value.status] ?? statusMapping.unknown;

  const importPercent = value.import_percent ?? 0;
  const pushPercent = value.push_percent ?? 0;
  const hasLarge = Boolean(value.has_large_files);
  const formattedLargeSize =
    value.large_files_size != null
      ? `${(value.large_files_size / (1024 * 1024)).toFixed(2)} MB`
      : null;

  // extract repo path from URL
  let repoPath: string;
  try {
    repoPath = new URL(value.vcs_url).pathname.replace(/^\/+/, "");
  } catch {
    repoPath = value.vcs_url;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 text-sm max-w-md mx-auto">
      {/* Header: Repository */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 truncate">
          <LucideReact.GitBranch size={20} className="text-gray-600" />
          <h2 className="font-semibold text-gray-800 truncate">{repoPath}</h2>
        </div>
        <div className="flex items-center space-x-1">
          <statusInfo.Icon size={16} className={statusInfo.colorClass} />
          <span className={`font-medium ${statusInfo.colorClass}`}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Optional status text or message */}
      {value.status_text ? (
        <div className="text-gray-600 line-clamp-2">{value.status_text}</div>
      ) : value.message ? (
        <div className="text-gray-600 line-clamp-2">{value.message}</div>
      ) : null}

      {/* Progress bars */}
      {value.import_percent != null && (
        <div className="space-y-1">
          <div className="flex justify-between text-gray-600 text-xs">
            <span>Import Progress</span>
            <span>{importPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2"
              style={{ width: `${importPercent}%` }}
            />
          </div>
        </div>
      )}
      {value.push_percent != null && (
        <div className="space-y-1">
          <div className="flex justify-between text-gray-600 text-xs">
            <span>Push Progress</span>
            <span>{pushPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2"
              style={{ width: `${pushPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="flex flex-wrap gap-4 text-gray-600">
        {value.commit_count != null && (
          <div className="flex items-center space-x-1">
            <LucideReact.GitCommit size={16} />
            <span>{value.commit_count} commits</span>
          </div>
        )}
        {value.authors_count != null && (
          <div className="flex items-center space-x-1">
            <LucideReact.Users size={16} />
            <span>{value.authors_count} authors</span>
          </div>
        )}
        {hasLarge && value.large_files_count != null && (
          <div className="flex items-center space-x-1">
            <LucideReact.FileText size={16} />
            <span>
              {value.large_files_count} files{" "}
              {formattedLargeSize && `(${formattedLargeSize})`}
            </span>
          </div>
        )}
      </div>

      {/* Project choices */}
      {value.status === "choose" &&
        Array.isArray(value.project_choices) &&
        value.project_choices.length > 0 && (
          <div>
            <h3 className="text-gray-800 font-medium mb-1">Project Choices</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
              {value.project_choices.map((p, i) => {
                const name =
                  p.human_name ??
                  `${p.vcs ?? ""}/${p.tfvc_project ?? ""}`.replace(/\/$/, "");
                return <li key={i}>{name}</li>;
              })}
            </ul>
          </div>
        )}

      {/* Error or failure */}
      {value.error_message && (
        <div className="flex items-start space-x-1 text-red-600">
          <LucideReact.AlertTriangle size={16} />
          <span className="break-words">{value.error_message}</span>
        </div>
      )}

      {/* Link to HTML view */}
      <div className="flex items-center space-x-1 text-gray-500 text-xs break-all">
        <LucideReact.Link size={16} />
        <span className="truncate">{value.html_url}</span>
      </div>
    </div>
  );
}
