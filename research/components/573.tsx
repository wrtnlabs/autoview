import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.artifact;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  };

  const formattedSize = formatBytes(value.size_in_bytes);
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : 'N/A';
  const expiresAt = value.expires_at
    ? new Date(value.expires_at).toLocaleString()
    : 'Never';
  const isExpired = value.expired;
  const digest = value.digest ?? null;
  const wf = value.workflow_run;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-4 space-y-4">
      {/* Header: Artifact Name */}
      <div className="flex items-center space-x-2">
        <LucideReact.Package size={24} className="text-gray-500" />
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.HardDrive size={16} className="text-gray-400" />
          <span>{formattedSize}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{createdAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{expiresAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          {isExpired ? (
            <LucideReact.AlertTriangle
              size={16}
              className="text-red-500"
            />
          ) : (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
            />
          )}
          <span>{isExpired ? 'Expired' : 'Active'}</span>
        </div>
      </div>

      {/* Optional Digest */}
      {digest && (
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">SHA256:</span>{' '}
          <code className="break-all">{digest}</code>
        </div>
      )}

      {/* Optional Workflow Run Info */}
      {wf && (
        <div className="text-sm text-gray-600 space-y-1">
          <span className="font-medium text-gray-800">Workflow Run:</span>
          <div className="flex flex-col pl-4 space-y-1">
            {wf.id != null && (
              <div className="flex items-center space-x-1">
                <LucideReact.Hash size={16} className="text-gray-400" />
                <span>#{wf.id}</span>
              </div>
            )}
            {wf.head_branch && (
              <div className="flex items-center space-x-1">
                <LucideReact.GitBranch
                  size={16}
                  className="text-gray-400"
                />
                <span>{wf.head_branch}</span>
              </div>
            )}
            {wf.head_sha && (
              <div className="flex items-center space-x-1">
                <LucideReact.Code size={16} className="text-gray-400" />
                <span className="font-mono">
                  {wf.head_sha.substring(0, 7)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
