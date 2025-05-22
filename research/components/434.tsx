import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const title = value.title ?? "Codespaces Public Key";
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  // Mask the key for display: show first 6 and last 6 characters
  const maskedKey =
    value.key.length > 12
      ? `${value.key.slice(0, 6)}...${value.key.slice(-6)}`
      : value.key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <LucideReact.Key size={20} className="text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {/* Key ID */}
        <div className="py-2 flex items-center text-sm text-gray-600">
          <LucideReact.Hash size={16} className="mr-1 text-gray-500" />
          <span className="truncate">{value.key_id}</span>
        </div>

        {/* Created At */}
        {createdAt && (
          <div className="py-2 flex items-center text-sm text-gray-600">
            <LucideReact.Calendar size={16} className="mr-1 text-gray-500" />
            <span>{createdAt}</span>
          </div>
        )}

        {/* URL */}
        {value.url && (
          <div className="py-2 flex items-center text-sm text-gray-600">
            <LucideReact.Link size={16} className="mr-1 text-gray-500" />
            <span className="truncate">{value.url}</span>
          </div>
        )}
      </div>

      {/* Public Key Display */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Public Key
        </label>
        <pre className="bg-gray-100 text-gray-800 text-xs rounded p-2 overflow-x-auto">
          <code>{maskedKey}</code>
        </pre>
      </div>
    </div>
  );
}
