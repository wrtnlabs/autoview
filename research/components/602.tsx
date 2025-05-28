import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunsArtifacts {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunsArtifacts.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const artifacts = value.artifacts;

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Archive size={20} className="text-gray-600 mr-2" />
        <span className="text-lg font-semibold text-gray-800">
          Artifacts ({totalCount})
        </span>
      </div>

      {artifacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-sm">No artifacts available.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {artifacts.map((artifact) => (
            <div
              key={artifact.id}
              className="flex flex-col justify-between bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <div>
                <h3 className="text-md font-medium text-gray-800 truncate">
                  {artifact.name}
                </h3>
                <div className="mt-2 flex items-center text-sm text-gray-500 gap-1">
                  <LucideReact.File size={14} />
                  <span>{formatBytes(artifact.size_in_bytes)}</span>
                </div>
                {artifact.created_at && (
                  <div className="mt-1 flex items-center text-sm text-gray-500 gap-1">
                    <LucideReact.Calendar size={14} />
                    <span>{formatDate(artifact.created_at)}</span>
                  </div>
                )}
                {artifact.expires_at && (
                  <div className="mt-1 flex items-center text-sm text-gray-500 gap-1">
                    <LucideReact.Clock size={14} />
                    <span>{formatDate(artifact.expires_at)}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                {artifact.expired ? (
                  <div className="flex items-center text-red-500 text-sm gap-1">
                    <LucideReact.AlertTriangle size={16} />
                    <span>Expired</span>
                  </div>
                ) : (
                  <div className="flex items-center text-green-500 text-sm gap-1">
                    <LucideReact.CheckCircle size={16} />
                    <span>Active</span>
                  </div>
                )}
                <a
                  href={artifact.archive_download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:text-blue-600 text-sm gap-1"
                >
                  <LucideReact.Download size={16} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
