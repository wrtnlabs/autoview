import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsArtifacts {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            artifacts: AutoViewInputSubTypes.artifact[];
        }
    }
    /**
     * An artifact
     *
     * @title Artifact
    */
    export interface artifact {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsArtifacts.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, artifacts } = value;

  // Format bytes into human-readable string
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const num = bytes / Math.pow(k, i);
    return `${num.toFixed(1)} ${sizes[i]}`;
  };

  // Format ISO date string (or null) into readable date
  const formatDate = (date: string | null): string => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour:   '2-digit',
      minute: '2-digit',
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Artifacts ({total_count})
        </h2>
        {total_count === 0 && (
          <div className="flex items-center text-gray-500">
            <LucideReact.AlertCircle size={24} className="mr-2" />
            <span>No artifacts available</span>
          </div>
        )}
      </div>

      {/* Artifacts Grid */}
      {artifacts.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artifacts.map((artifact) => (
            <div
              key={artifact.id}
              className="p-4 bg-white rounded-lg shadow flex flex-col"
            >
              {/* Name */}
              <div className="flex items-center space-x-2 mb-3">
                <LucideReact.FileText
                  size={20}
                  className="text-indigo-500 flex-shrink-0"
                />
                <span
                  className="font-medium text-gray-900 truncate"
                  title={artifact.name}
                >
                  {artifact.name}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <LucideReact.Database
                    size={16}
                    className="text-gray-400 flex-shrink-0"
                  />
                  <span>{formatBytes(artifact.size_in_bytes)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar
                    size={16}
                    className="text-gray-400 flex-shrink-0"
                  />
                  <span>Created: {formatDate(artifact.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.Clock
                    size={16}
                    className="text-gray-400 flex-shrink-0"
                  />
                  <span>Expires: {formatDate(artifact.expires_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  {artifact.expired ? (
                    <LucideReact.XCircle
                      size={16}
                      className="text-red-500 flex-shrink-0"
                    />
                  ) : (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500 flex-shrink-0"
                    />
                  )}
                  <span>
                    {artifact.expired ? 'Expired' : 'Active'}
                  </span>
                </div>
                {artifact.digest && (
                  <div className="flex items-center gap-1">
                    <LucideReact.Code
                      size={16}
                      className="text-gray-400 flex-shrink-0"
                    />
                    <span title={artifact.digest}>
                      {artifact.digest.slice(0, 8)}…
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
