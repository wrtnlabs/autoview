import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.artifact;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatFileSize = (bytes: number): string => {
    const thresh = 1024;
    if (bytes < thresh) return `${bytes} B`;
    const units = ["KB", "MB", "GB", "TB"];
    let u = -1;
    let size = bytes;
    do {
      size /= thresh;
      u++;
    } while (size >= thresh && u < units.length - 1);
    return `${size.toFixed(1)} ${units[u]}`;
  };

  const formattedSize = formatFileSize(value.size_in_bytes);
  const formattedCreated = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : "Unknown";
  const formattedExpires = value.expires_at
    ? new Date(value.expires_at).toLocaleString()
    : "Never";

  const now = new Date();
  const expiresDate = value.expires_at ? new Date(value.expires_at) : null;
  let statusText: string;
  let statusIcon: React.ReactNode;

  if (value.expired) {
    statusText = "Expired";
    statusIcon = <LucideReact.XCircle className="text-red-500" size={16} />;
  } else if (expiresDate) {
    const days = Math.ceil(
      (expiresDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    statusText =
      days > 1
        ? `Expires in ${days} days`
        : days === 1
          ? "Expires in 1 day"
          : "Expires today";
    statusIcon = <LucideReact.Clock className="text-amber-500" size={16} />;
  } else {
    statusText = "Never expires";
    statusIcon = <LucideReact.Infinity className="text-gray-500" size={16} />;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="flex-1 text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <div className="flex items-center gap-1 text-sm text-gray-600 ml-4">
          {statusIcon}
          <span>{statusText}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.FileText size={16} />
          <span>{formattedSize}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {formattedCreated}</span>
        </div>
        {value.expires_at && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Expires: {formattedExpires}</span>
          </div>
        )}
      </div>

      {value.digest && (
        <div className="mt-3 flex items-center gap-1 text-sm text-gray-500 break-all">
          <LucideReact.Hash size={16} />
          <span>{value.digest}</span>
        </div>
      )}
    </div>
  );
}
