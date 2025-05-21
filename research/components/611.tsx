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
  const displayTitle: string = value.title ?? `Key ${value.key_id}`;
  const formattedDate: string = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : 'Unknown';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 truncate">{displayTitle}</h2>

      <dl className="space-y-2 text-sm text-gray-600 mb-4">
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

        <div className="flex justify-between">
          <dt className="font-medium">Created</dt>
          <dd className="ml-2">{formattedDate}</dd>
        </div>
      </dl>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-3 overflow-x-auto text-sm font-mono text-gray-700">
        {value.key}
      </div>
    </div>
  );
}
