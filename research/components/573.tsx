import { tags } from "typia";
import React from "react";
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
  const formatBytes = (bytes: number): string => {
    if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(2)} GB`;
    if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(2)} MB`;
    if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(2)} KB`;
    return `${bytes} B`;
  };

  const formatDateTime = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  const statusText = value.expired ? "Expired" : "Active";
  const statusClasses = value.expired
    ? "bg-red-100 text-red-800"
    : "bg-green-100 text-green-800";

  const formattedSize = formatBytes(value.size_in_bytes);
  const createdAt = formatDateTime(value.created_at);
  const updatedAt = formatDateTime(value.updated_at);
  const expiresAt = formatDateTime(value.expires_at);

  const digestShort =
    value.digest && value.digest.length > 16
      ? `${value.digest.slice(0, 8)}…${value.digest.slice(-8)}`
      : value.digest || "—";

  let workflowInfo: string | null = null;
  if (value.workflow_run) {
    const { head_branch, head_sha } = value.workflow_run;
    if (head_branch || head_sha) {
      const shaShort = head_sha ? `${head_sha.slice(0, 7)}` : "";
      workflowInfo = head_branch
        ? head_sha
          ? `${head_branch} @ ${shaShort}`
          : head_branch
        : shaShort;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-sm mx-auto">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <span
          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}
        >
          {statusText}
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div>
          <dt className="font-medium">Size</dt>
          <dd>{formattedSize}</dd>
        </div>
        <div>
          <dt className="font-medium">Created</dt>
          <dd>{createdAt}</dd>
        </div>
        <div>
          <dt className="font-medium">Updated</dt>
          <dd>{updatedAt}</dd>
        </div>
        <div>
          <dt className="font-medium">Expires</dt>
          <dd>{expiresAt}</dd>
        </div>
        {value.digest != null && (
          <div className="col-span-2">
            <dt className="font-medium">Digest</dt>
            <dd className="font-mono text-gray-700 break-all">{digestShort}</dd>
          </div>
        )}
        {workflowInfo && (
          <div className="col-span-2">
            <dt className="font-medium">Workflow</dt>
            <dd>{workflowInfo}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
