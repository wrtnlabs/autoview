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
  const statusLabel = value.status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const importPercent = value.import_percent ?? 0;
  const pushPercent = value.push_percent ?? 0;
  const commitCount = value.commit_count ?? 0;
  const authorsCount = value.authors_count ?? 0;

  function formatBytes(bytes: number | null | undefined): string {
    if (bytes === undefined || bytes === null) return 'N/A';
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Import Overview</h2>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
          {statusLabel}
        </span>
      </div>

      {value.status_text && (
        <p className="text-sm text-gray-600 mb-2">{value.status_text}</p>
      )}
      {value.error_message && (
        <p className="text-sm text-red-600 mb-2">Error: {value.error_message}</p>
      )}

      {(importPercent > 0 || pushPercent > 0) && (
        <div className="space-y-4 mb-4">
          {importPercent > 0 && (
            <div>
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>Import Progress</span>
                <span>{importPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${importPercent}%` }}
                />
              </div>
            </div>
          )}
          {pushPercent > 0 && (
            <div>
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>Push Progress</span>
                <span>{pushPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${pushPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex space-x-6 mb-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Commits</p>
          <p className="text-lg font-medium text-gray-800">{commitCount}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Authors</p>
          <p className="text-lg font-medium text-gray-800">{authorsCount}</p>
        </div>
      </div>

      {value.has_large_files && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Large Files</p>
          <p className="text-gray-700">
            {value.large_files_count ?? '—'} files (
            {formatBytes(value.large_files_size)})
          </p>
        </div>
      )}

      {value.project_choices && value.project_choices.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Project Choices</p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {value.project_choices.map((pc, i) => (
              <li key={i}>
                {pc.human_name ?? pc.vcs ?? '—'}
                {pc.tfvc_project ? ` (${pc.tfvc_project})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2 text-sm text-gray-500">
        <div>
          <span className="font-medium text-gray-700">VCS:</span>{' '}
          {value.vcs ?? 'Unknown'}
        </div>
        <div>
          <span className="font-medium text-gray-700">Repository URL:</span>{' '}
          <span className="text-blue-600 truncate block">
            {value.repository_url}
          </span>
        </div>
        {value.html_url && (
          <div>
            <span className="font-medium text-gray-700">HTML URL:</span>{' '}
            <span className="text-blue-600 truncate block">{value.html_url}</span>
          </div>
        )}
      </div>

      {value.message && (
        <p className="mt-4 text-sm text-gray-700">{value.message}</p>
      )}
    </div>
  );
}
