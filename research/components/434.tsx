import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The public key used for setting Codespaces secrets.
     *
     * @title CodespacesPublicKey
    */
    export type codespaces_public_key = {
        /**
         * The identifier for the key.
        */
        key_id: string;
        /**
         * The Base64 encoded public key.
        */
        key: string;
        id?: number & tags.Type<"int32">;
        url?: string;
        title?: string;
        created_at?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.codespaces_public_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayTitle = value.title ?? "Codespaces Public Key";
  const formattedDate = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : undefined;
  const truncatedKey =
    value.key.length > 40
      ? `${value.key.slice(0, 20)}…${value.key.slice(-20)}`
      : value.key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{displayTitle}</h2>
        {formattedDate && (
          <time className="text-sm text-gray-500 mt-1 sm:mt-0">
            {formattedDate}
          </time>
        )}
      </div>
      <dl className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <dt className="font-medium">Key ID</dt>
          <dd className="ml-2 truncate">{value.key_id}</dd>
        </div>
        {value.url && (
          <div className="flex justify-between">
            <dt className="font-medium">URL</dt>
            <dd className="ml-2 truncate">{value.url}</dd>
          </div>
        )}
        <div>
          <dt className="font-medium">Public Key</dt>
          <dd className="mt-1 font-mono text-sm break-all truncate">
            {truncatedKey}
          </dd>
        </div>
      </dl>
    </div>
  );
}
