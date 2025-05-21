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
  const statusLabel = (() => {
    const mapping: Record<string, string> = {
      auth: "Authentication Required",
      error: "Error",
      none: "Not Started",
      detecting: "Detecting",
      choose: "Choose Repository",
      auth_failed: "Authentication Failed",
      importing: "Importing",
      mapping: "Mapping",
      waiting_to_push: "Waiting to Push",
      pushing: "Pushing",
      complete: "Complete",
      setup: "Setup",
      unknown: "Unknown",
      detection_found_multiple: "Multiple Found",
      detection_found_nothing: "None Found",
      detection_needs_auth: "Detection Needs Auth",
    };
    return mapping[value.status] || value.status;
  })();

  const importPercent = value.import_percent ?? 0;
  const pushPercent = value.push_percent ?? 0;
  const commitCount = value.commit_count ?? 0;
  const authorsCount = value.authors_count ?? 0;
  const hasLarge = value.has_large_files;
  const largeCount = value.large_files_count ?? 0;
  const largeSizeRaw = value.large_files_size ?? 0;

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(1)} GB`;
  };

  const truncate = (str: string, len = 40): string =>
    str.length > len ? str.slice(0, len) + "…" : str;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Repository Import</h2>
        <p className="text-sm text-gray-500 truncate" title={value.vcs_url}>
          {truncate(value.vcs_url)}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center space-x-2">
        <span
          className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
        >
          {statusLabel}
        </span>
        {value.status_text && (
          <span className="text-sm text-gray-500 truncate" title={value.status_text}>
            {truncate(value.status_text, 50)}
          </span>
        )}
      </div>

      {/* Error Message */}
      {value.status === "error" && value.error_message && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {truncate(value.error_message, 100)}
        </div>
      )}

      {/* Progress Bars */}
      {["importing", "pushing"].includes(value.status) && (
        <div className="space-y-3">
          {/* Import Progress */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Import Progress</span>
              <span>{importPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
              <div
                className="h-2 bg-blue-500"
                style={{ width: `${importPercent}%` }}
              />
            </div>
          </div>
          {/* Push Progress */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Push Progress</span>
              <span>{pushPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
              <div
                className="h-2 bg-green-500"
                style={{ width: `${pushPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <div className="font-medium">Commits</div>
          <div>{commitCount}</div>
        </div>
        <div>
          <div className="font-medium">Authors</div>
          <div>{authorsCount}</div>
        </div>
        {hasLarge && (
          <>
            <div>
              <div className="font-medium">Large Files</div>
              <div>{largeCount}</div>
            </div>
            <div>
              <div className="font-medium">Total Size</div>
              <div>{formatBytes(largeSizeRaw)}</div>
            </div>
          </>
        )}
      </div>

      {/* Project Choices */}
      {Array.isArray(value.project_choices) && value.project_choices.length > 0 && (
        <div>
          <div className="font-medium text-gray-800 mb-1">Project Choices</div>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {value.project_choices.map((choice, idx) => {
              const label =
                choice.human_name ||
                `${choice.vcs ?? "Unknown VCS"}${choice.tfvc_project ? ` / ${choice.tfvc_project}` : ""}`;
              return (
                <li key={idx} title={label}>
                  {truncate(label, 50)}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Additional Message */}
      {value.message && (
        <div className="text-sm text-gray-600">
          {truncate(value.message, 120)}
        </div>
      )}
    </div>
  );
}
