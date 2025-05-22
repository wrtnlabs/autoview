import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposActionsRunsArtifacts.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const { total_count, artifacts } = value;

  // Format ISO date strings into a human‐readable format
  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Convert bytes into B/KB/MB with precision
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
      {/* Header with total count */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <LucideReact.Archive className="text-gray-500" size={20} />
          Artifacts ({total_count})
        </h2>
      </div>

      {/* Empty state */}
      {artifacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2">No artifacts available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {artifacts.map((artifact) => (
            <li key={artifact.id} className="p-4 bg-gray-50 rounded-lg">
              {/* Name and size */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LucideReact.FileText className="text-indigo-500" size={20} />
                  <span className="font-medium text-gray-800 truncate">
                    {artifact.name}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {formatSize(artifact.size_in_bytes)}
                </div>
              </div>

              {/* Dates and expiration status */}
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 space-y-2 sm:space-y-0">
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>Created: {formatDate(artifact.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  {artifact.expired ? (
                    <>
                      <LucideReact.AlertTriangle
                        size={16}
                        className="text-red-500"
                      />
                      <span className="text-red-600">Expired</span>
                    </>
                  ) : (
                    <>
                      <LucideReact.CheckCircle
                        size={16}
                        className="text-green-500"
                      />
                      <span>Expires: {formatDate(artifact.expires_at)}</span>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
