import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The public key used for setting Actions Secrets.
     *
     * @title ActionsPublicKey
    */
    export interface actions_public_key {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.actions_public_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const title = value.title?.trim() || "Actions Public Key";
  const formattedDate = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <LucideReact.Key size={20} className="text-indigo-500 mr-2" />
        {title}
      </h2>
      <dl className="grid grid-cols-1 gap-3">
        <div className="flex items-start">
          <LucideReact.Hash size={16} className="text-gray-500 mr-2 mt-0.5" />
          <div>
            <dt className="text-sm font-medium text-gray-700">Key ID</dt>
            <dd className="text-sm text-gray-900 break-all">{value.key_id}</dd>
          </div>
        </div>
        {formattedDate && (
          <div className="flex items-start">
            <LucideReact.Calendar size={16} className="text-gray-500 mr-2 mt-0.5" />
            <div>
              <dt className="text-sm font-medium text-gray-700">Created At</dt>
              <dd className="text-sm text-gray-900">{formattedDate}</dd>
            </div>
          </div>
        )}
      </dl>
      <div className="mt-4">
        <dt className="text-sm font-medium text-gray-700 mb-1">Public Key</dt>
        <pre className="bg-gray-100 p-2 rounded text-xs font-mono text-gray-800 overflow-x-auto">
          {value.key}
        </pre>
      </div>
    </div>
  );
}
