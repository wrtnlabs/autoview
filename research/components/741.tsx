import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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

// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { key_id, key, title, url, created_at } = value;
  const displayTitle = title && title.trim() ? title : "Actions Public Key";
  const formattedDate = created_at
    ? new Date(created_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <LucideReact.Tag size={20} className="text-gray-600" />
        <span>{displayTitle}</span>
      </h2>

      {/* Metadata (Key ID, URL, Created At) */}
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <div className="flex items-start gap-2">
          <LucideReact.Hash size={16} className="text-gray-500 mt-1" />
          <span className="break-all">{key_id}</span>
        </div>
        {url && (
          <div className="flex items-start gap-2">
            <LucideReact.Link size={16} className="text-gray-500 mt-1" />
            <span className="break-all">{url}</span>
          </div>
        )}
        {formattedDate && (
          <div className="flex items-start gap-2">
            <LucideReact.Calendar size={16} className="text-gray-500 mt-1" />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>

      {/* Public Key Display */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-1">
          <LucideReact.Key size={16} className="text-indigo-500" />
          <span className="text-sm font-medium text-gray-800">Public Key</span>
        </div>
        <div className="p-2 bg-gray-100 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
          {key}
        </div>
      </div>
    </div>
  );
}
