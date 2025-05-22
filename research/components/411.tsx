import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The public key used for setting Actions Secrets.
     *
     * @title ActionsPublicKey
    */
    export type actions_public_key = {
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
export type AutoViewInput = AutoViewInputSubTypes.actions_public_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const headerTitle = value.title?.trim() || "Actions Public Key";
  const formattedDate =
    value.created_at
      ? new Date(value.created_at).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;
  const truncatedKey =
    value.key.length > 60
      ? `${value.key.slice(0, 30)}…${value.key.slice(-30)}`
      : value.key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 truncate">{headerTitle}</h2>
      <dl className="mt-3 grid grid-cols-1 gap-y-2">
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Key ID</dt>
          <dd className="text-sm text-gray-900 truncate">{value.key_id}</dd>
        </div>
        {formattedDate && (
          <div className="flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="text-sm text-gray-900">{formattedDate}</dd>
          </div>
        )}
        {value.url && (
          <div className="flex justify-between">
            <dt className="text-sm font-medium text-gray-500">URL</dt>
            <dd className="text-sm text-blue-600 truncate">{value.url}</dd>
          </div>
        )}
      </dl>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">Public Key</p>
        <pre className="mt-1 max-h-40 overflow-auto whitespace-pre-wrap bg-gray-50 p-2 rounded text-xs font-mono text-gray-800">
          {truncatedKey}
        </pre>
      </div>
    </div>
  );
}
