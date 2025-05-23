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
  const hostName = (() => {
    try {
      return new URL(value.vcs_url).hostname;
    } catch {
      return value.vcs_url;
    }
  })();

  const formattedImportPercent =
    value.import_percent != null ? `${value.import_percent}%` : '';
  const formattedPushPercent =
    value.push_percent != null ? `${value.push_percent}%` : '';

  const formattedLargeFilesSize =
    value.large_files_size != null
      ? `${(value.large_files_size / (1024 * 1024)).toFixed(2)} MB`
      : '';

  const statusMap: Record<
    AutoViewInputSubTypes._import['status'],
    { icon: JSX.Element; label: string }
  > = {
    complete: {
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      label: 'Complete',
    },
    importing: {
      icon: (
        <LucideReact.Loader size={16} className="animate-spin text-blue-500" />
      ),
      label: 'Importing',
    },
    mapping: {
      icon: (
        <LucideReact.Loader size={16} className="animate-spin text-blue-500" />
      ),
      label: 'Mapping',
    },
    waiting_to_push: {
      icon: (
        <LucideReact.Loader size={16} className="animate-spin text-blue-500" />
      ),
      label: 'Waiting to Push',
    },
    pushing: {
      icon: (
        <LucideReact.Loader size={16} className="animate-spin text-blue-500" />
      ),
      label: 'Pushing',
    },
    error: {
      icon: <LucideReact.AlertTriangle size={16} className="text-red-500" />,
      label: 'Error',
    },
    auth_failed: {
      icon: <LucideReact.AlertTriangle size={16} className="text-red-500" />,
      label: 'Auth Failed',
    },
    auth: {
      icon: <LucideReact.Key size={16} className="text-yellow-500" />,
      label: 'Auth Required',
    },
    none: {
      icon: <LucideReact.Circle size={16} className="text-gray-400" />,
      label: 'Not Started',
    },
    detecting: {
      icon: <LucideReact.Clock size={16} className="text-amber-500" />,
      label: 'Detecting',
    },
    choose: {
      icon: <LucideReact.Clock size={16} className="text-amber-500" />,
      label: 'Choice Needed',
    },
    setup: {
      icon: <LucideReact.Cog size={16} className="text-blue-500" />,
      label: 'Setup',
    },
    unknown: {
      icon: <LucideReact.HelpCircle size={16} className="text-gray-500" />,
      label: 'Unknown',
    },
    detection_found_multiple: {
      icon: <LucideReact.AlertTriangle size={16} className="text-yellow-500" />,
      label: 'Multiple Found',
    },
    detection_found_nothing: {
      icon: <LucideReact.AlertCircle size={16} className="text-gray-400" />,
      label: 'None Found',
    },
    detection_needs_auth: {
      icon: <LucideReact.Lock size={16} className="text-yellow-500" />,
      label: 'Detection Needs Auth',
    },
  };

  const statusInfo =
    statusMap[value.status] || {
      icon: <LucideReact.HelpCircle size={16} className="text-gray-500" />,
      label: value.status,
    };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: VCS type and host */}
      <div className="flex items-center space-x-2">
        <LucideReact.GitBranch className="text-gray-600" size={20} />
        <span className="text-lg font-semibold text-gray-800">
          {value.vcs ?? 'Repository'}
        </span>
        <span className="text-sm text-gray-500 truncate">{hostName}</span>
      </div>

      {/* Status */}
      <div className="flex items-center mt-3 space-x-2">
        {statusInfo.icon}
        <span className="text-sm font-medium text-gray-700">
          {statusInfo.label}
        </span>
      </div>
      {value.status_text && (
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {value.status_text}
        </p>
      )}

      {/* Progress Bars */}
      {value.import_percent != null && (
        <div className="mt-4">
          <div className="flex justify-between text-xs font-medium text-gray-600">
            <span>Import Progress</span>
            <span>{formattedImportPercent}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: formattedImportPercent }}
            />
          </div>
        </div>
      )}
      {value.push_percent != null && (
        <div className="mt-3">
          <div className="flex justify-between text-xs font-medium text-gray-600">
            <span>Push Progress</span>
            <span>{formattedPushPercent}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: formattedPushPercent }}
            />
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-gray-600">
        {value.commit_count != null && (
          <div className="flex items-center">
            <LucideReact.GitCommit className="text-gray-500" size={16} />
            <span className="ml-1">Commits: {value.commit_count}</span>
          </div>
        )}
        {value.authors_count != null && (
          <div className="flex items-center">
            <LucideReact.Users className="text-gray-500" size={16} />
            <span className="ml-1">Authors: {value.authors_count}</span>
          </div>
        )}
        {value.has_large_files && (
          <div className="flex items-center">
            <LucideReact.FileText className="text-gray-500" size={16} />
            <span className="ml-1">
              {value.large_files_count} large files ({formattedLargeFilesSize})
            </span>
          </div>
        )}
        {Array.isArray(value.project_choices) && value.project_choices.length > 0 && (
          <div className="col-span-2">
            <div className="flex items-center">
              <LucideReact.List className="text-gray-500" size={16} />
              <span className="ml-1 font-medium text-gray-700">
                Project Choices
              </span>
            </div>
            <ul className="mt-1 ml-6 list-disc text-gray-600 space-y-0.5">
              {value.project_choices.map((pc, idx) => (
                <li key={idx}>
                  {pc.human_name ?? pc.vcs ?? pc.tfvc_project ?? '–'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Error or General Message */}
      {(value.error_message || value.message) && (
        <div className="mt-6 p-3 bg-red-50 text-red-700 text-sm rounded flex items-start">
          <LucideReact.Info className="flex-shrink-0 text-red-500" size={16} />
          <p className="ml-2">
            {value.error_message ?? value.message}
          </p>
        </div>
      )}

      {/* Links */}
      <div className="mt-6 border-t pt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Link className="text-gray-400" size={16} />
          <span className="ml-1 truncate">{value.html_url}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.GitCommit className="text-gray-400" size={16} />
          <span className="ml-1 truncate">{value.repository_url}</span>
        </div>
      </div>
    </div>
  );
}
