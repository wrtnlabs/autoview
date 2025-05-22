import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsArtifacts.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, artifacts } = value;

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const formatDate = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      : '—';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Artifacts ({total_count})
      </h2>
      <ul className="space-y-4">
        {artifacts.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-md font-medium text-gray-900 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Size:{' '}
                <span className="font-medium text-gray-800">
                  {formatBytes(item.size_in_bytes)}
                </span>
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-600 mt-1">
                <p>
                  Created:{' '}
                  <span className="font-medium text-gray-800">
                    {formatDate(item.created_at)}
                  </span>
                </p>
                <p>
                  Expires:{' '}
                  <span className="font-medium text-gray-800">
                    {formatDate(item.expires_at)}
                  </span>
                </p>
              </div>
              {item.digest && (
                <p className="text-sm text-gray-600 mt-1">
                  Digest:{' '}
                  <span className="font-mono text-gray-800">
                    {item.digest.slice(0, 12)}...
                  </span>
                </p>
              )}
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center space-x-2">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  item.expired
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {item.expired ? 'Expired' : 'Active'}
              </span>
              {item.workflow_run?.id != null && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 font-semibold rounded-full">
                  Run #{item.workflow_run.id}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
