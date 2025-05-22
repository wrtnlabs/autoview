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

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { key_id, key, title, url, created_at } = value;

  // Format creation date
  const formattedDate = created_at
    ? new Date(created_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  // Truncate long strings
  const truncateMiddle = (str: string, length = 30): string => {
    if (str.length <= length * 2) return str;
    return `${str.slice(0, length)}…${str.slice(-length)}`;
  };
  const displayKey = truncateMiddle(key, 20);
  const displayUrl = url ? truncateMiddle(url, 30) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-full">
      <div className="flex items-center mb-4">
        <LucideReact.Key
          size={20}
          className="text-gray-500 mr-2"
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {title ?? "Actions Public Key"}
        </h2>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Key ID</dt>
          <dd className="mt-1 text-sm text-gray-900 break-all">
            <code className="font-mono">{key_id}</code>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Created</dt>
          <dd className="mt-1 text-sm text-gray-900 flex items-center">
            <LucideReact.Calendar
              size={16}
              className="text-gray-400 mr-1"
              aria-hidden="true"
            />
            <span>{formattedDate}</span>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">Public Key</dt>
          <dd className="mt-1 text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded overflow-x-auto">
            {displayKey}
          </dd>
        </div>
        {displayUrl && (
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">URL</dt>
            <dd className="mt-1 text-sm text-gray-900 flex items-center break-all">
              <LucideReact.Link
                size={16}
                className="text-gray-400 mr-1"
                aria-hidden="true"
              />
              <span>{displayUrl}</span>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
