import LucideReact from "lucide-react";
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
  // 1. Data transformations & derived values
  const displayTitle =
    value.title && value.title.trim().length > 0 ? value.title : value.key_id;
  const maskedKey =
    value.key.length > 16
      ? `${value.key.slice(0, 8)}…${value.key.slice(-8)}`
      : value.key;
  const formattedDate = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  // 2. JSX composition with Tailwind CSS
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <LucideReact.Key size={20} className="text-indigo-500" />
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={displayTitle}
        >
          {displayTitle}
        </h2>
      </div>

      <div className="bg-gray-50 p-3 rounded font-mono text-sm text-gray-700 break-all">
        {maskedKey}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600">
        {formattedDate && (
          <div className="flex items-center gap-1 mb-2 sm:mb-0">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Created: {formattedDate}</span>
          </div>
        )}
        {value.url && (
          <div className="flex items-center gap-1">
            <LucideReact.Link size={16} className="text-gray-400" />
            <span className="truncate" title={value.url}>
              {value.url}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
