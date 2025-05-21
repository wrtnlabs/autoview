import { tags } from "typia";
import React from "react";
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes._import;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayVcs = value.vcs ?? "N/A";

  const statusMap: Record<string, string> = {
    none: "Not Started",
    setup: "Setup",
    detecting: "Detecting Repository",
    detection_found_nothing: "No Repository Found",
    detection_found_multiple: "Multiple Repositories Found",
    detection_needs_auth: "Authentication Required",
    choose: "Choose Repository",
    auth: "Authenticating",
    auth_failed: "Authentication Failed",
    importing: "Importing",
    mapping: "Mapping Users",
    waiting_to_push: "Waiting to Push",
    pushing: "Pushing Commits",
    complete: "Complete",
    error: "Error",
    unknown: "Unknown Status",
  };
  const displayStatus = statusMap[value.status] ?? value.status;

  const importPercent = value.import_percent != null ? value.import_percent : 0;
  const pushPercent = value.push_percent != null ? value.push_percent : 0;

  const formattedCommitCount =
    typeof value.commit_count === "number"
      ? value.commit_count.toLocaleString()
      : "-";
  const formattedAuthorsCount =
    typeof value.authors_count === "number"
      ? value.authors_count.toLocaleString()
      : "-";

  const hasLargeFiles = value.has_large_files === true;
  const largeFilesSizeMB =
    hasLargeFiles && typeof value.large_files_size === "number"
      ? (value.large_files_size / (1024 * 1024)).toFixed(2)
      : null;

  const feedbackMessage =
    value.error_message || value.status_text || value.message || null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Repository Import
        </h2>
        <span className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded">
          {displayStatus}
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-700">
        <div>
          <span className="font-medium">VCS:</span> {displayVcs}
        </div>
        <div>
          <span className="font-medium">Repo URL:</span>{" "}
          <span className="break-all text-blue-600">{value.vcs_url}</span>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-2 bg-red-50 text-red-700 text-sm rounded">
          {feedbackMessage}
        </div>
      )}

      {value.import_percent != null && (
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Import Progress</span>
            <span>{importPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              style={{ width: `${importPercent}%` }}
              className="bg-blue-500 h-2 rounded"
            />
          </div>
        </div>
      )}

      {value.push_percent != null && (
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Push Progress</span>
            <span>{pushPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              style={{ width: `${pushPercent}%` }}
              className="bg-green-500 h-2 rounded"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Commits:</span>{" "}
          {formattedCommitCount}
        </div>
        <div>
          <span className="font-medium">Authors:</span>{" "}
          {formattedAuthorsCount}
        </div>
        {hasLargeFiles && largeFilesSizeMB && (
          <div className="col-span-2">
            <span className="font-medium">Large Files:</span>{" "}
            {value.large_files_count} files ({largeFilesSizeMB} MB)
          </div>
        )}
      </div>

      {value.project_choices && value.project_choices.length > 0 && (
        <div>
          <span className="font-medium text-sm text-gray-700">
            Project Choices:
          </span>
          <ul className="mt-1 list-disc list-inside text-sm text-gray-600 space-y-1">
            {value.project_choices.map((choice, idx) => (
              <li key={idx}>
                {choice.human_name ||
                  choice.vcs ||
                  choice.tfvc_project ||
                  "Unnamed Choice"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
