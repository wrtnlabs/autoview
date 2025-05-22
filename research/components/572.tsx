import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsArtifacts {
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
  AutoViewInputSubTypes.IApiReposActionsArtifacts.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const humanFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);
    return `${size.toFixed(1)} ${sizes[i]}`;
  };

  const formatDate = (iso?: string | null): string => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with total count */}
      <div className="flex items-center text-gray-700 mb-4">
        <LucideReact.Archive size={20} className="text-gray-500" />
        <span className="ml-2 font-semibold">
          {value.total_count} Artifacts
        </span>
      </div>

      {/* Artifact list */}
      <ul className="space-y-4">
        {value.artifacts.map((artifact) => (
          <li
            key={artifact.id}
            className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Name & Size */}
            <div className="flex items-center">
              <LucideReact.FileArchive size={24} className="text-indigo-500" />
              <div className="ml-3">
                <div className="text-gray-900 font-medium truncate max-w-xs">
                  {artifact.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {humanFileSize(artifact.size_in_bytes)}
                </div>
              </div>
            </div>

            {/* Dates & Status */}
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-600 text-sm">
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="ml-1">{formatDate(artifact.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Clock size={16} className="text-gray-400" />
                <span className="ml-1">{formatDate(artifact.expires_at)}</span>
              </div>
              <div className="flex items-center">
                <span>Status:</span>
                {artifact.expired ? (
                  <LucideReact.AlertTriangle
                    size={16}
                    className="ml-1 text-red-500"
                    aria-label="Expired"
                  />
                ) : (
                  <LucideReact.CheckCircle
                    size={16}
                    className="ml-1 text-green-500"
                    aria-label="Active"
                  />
                )}
              </div>
            </div>
          </li>
        ))}
        {value.artifacts.length === 0 && (
          <li className="flex items-center justify-center py-10 text-gray-400">
            <LucideReact.AlertCircle size={24} />
            <span className="ml-2">No artifacts available</span>
          </li>
        )}
      </ul>
    </div>
  );
}
