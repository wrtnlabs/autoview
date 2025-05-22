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
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : undefined;
  const rawKey = value.key ?? "";
  const truncatedKey =
    rawKey.length > 40
      ? `${rawKey.slice(0, 20)}…${rawKey.slice(-20)}`
      : rawKey;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">{displayTitle}</h2>
      <dl className="mt-3 space-y-2 text-gray-700 text-sm">
        <div className="flex justify-between">
          <dt className="font-medium">Key ID</dt>
          <dd className="ml-2 break-words">{value.key_id}</dd>
        </div>
        {formattedDate && (
          <div className="flex justify-between">
            <dt className="font-medium">Created At</dt>
            <dd className="ml-2">{formattedDate}</dd>
          </div>
        )}
        <div>
          <dt className="font-medium">Public Key</dt>
          <dd className="mt-1 font-mono text-xs text-gray-600 break-words">
            {truncatedKey}
          </dd>
        </div>
      </dl>
    </div>
  );
}
