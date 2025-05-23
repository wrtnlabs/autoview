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
  // Derive display title
  const displayTitle = value.title || "Actions Public Key";

  // Mask the public key to show only start/end segments if it's long
  const fullKey = value.key;
  const maskedKey =
    fullKey.length > 32
      ? `${fullKey.slice(0, 8)}…${fullKey.slice(-8)}`
      : fullKey;

  // Format creation date
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <LucideReact.Key size={20} className="text-gray-600" />
        {displayTitle}
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        <div className="flex items-start gap-2">
          <LucideReact.Hash size={16} className="text-gray-500 mt-1" aria-label="Key ID" />
          <div className="flex-1">
            <div className="text-gray-600 text-sm font-medium">Key ID</div>
            <div className="text-gray-800 text-sm truncate">{value.key_id}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <LucideReact.Lock size={16} className="text-gray-500 mt-1" aria-label="Public Key" />
          <div className="flex-1">
            <div className="text-gray-600 text-sm font-medium">Public Key</div>
            <div className="text-gray-800 text-sm font-mono break-all">{maskedKey}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <LucideReact.Calendar size={16} className="text-gray-500 mt-1" aria-label="Created At" />
          <div className="flex-1">
            <div className="text-gray-600 text-sm font-medium">Created At</div>
            <div className="text-gray-800 text-sm">{createdAt}</div>
          </div>
        </div>
        {value.url && (
          <div className="flex items-start gap-2">
            <LucideReact.Link size={16} className="text-gray-500 mt-1" aria-label="URL" />
            <div className="flex-1">
              <div className="text-gray-600 text-sm font-medium">URL</div>
              <div className="text-blue-600 text-sm break-all">{value.url}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
