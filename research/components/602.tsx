import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunsArtifacts {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            artifacts: AutoViewInputSubTypes.artifact[];
        };
    }
    /**
     * An artifact
     *
     * @title Artifact
    */
    export type artifact = {
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the artifact.
        */
        name: string;
        /**
         * The size in bytes of the artifact.
        */
        size_in_bytes: number & tags.Type<"int32">;
        url: string;
        archive_download_url: string;
        /**
         * Whether or not the artifact has expired.
        */
        expired: boolean;
        created_at: (string & tags.Format<"date-time">) | null;
        expires_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        /**
         * The SHA256 digest of the artifact. This field will only be populated on artifacts uploaded with upload-artifact v4 or newer. For older versions, this field will be null.
        */
        digest?: string | null;
        workflow_run?: {
            id?: number & tags.Type<"int32">;
            repository_id?: number & tags.Type<"int32">;
            head_repository_id?: number & tags.Type<"int32">;
            head_branch?: string;
            head_sha?: string;
        } | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunsArtifacts.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedTotal = `${value.total_count} Artifact${value.total_count !== 1 ? 's' : ''}`;
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${size} ${sizes[i]}`;
  };
  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{formattedTotal}</h2>
      <ul className="space-y-4">
        {value.artifacts.map((artifact) => {
          const created = formatDate(artifact.created_at);
          const expires = formatDate(artifact.expires_at);
          const statusClasses = artifact.expired
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800';
          const statusText = artifact.expired ? 'Expired' : 'Active';
          return (
            <li key={artifact.id}>
              <div className="flex flex-col sm:flex-row sm:justify-between p-4 bg-gray-50 rounded-lg">
                <div className="min-w-0">
                  <p className="text-base font-medium text-gray-900 truncate">
                    {artifact.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatBytes(artifact.size_in_bytes)} • Created: {created}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses}`}
                  >
                    {statusText}
                  </span>
                  <p className="text-sm text-gray-500">Expires: {expires}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
