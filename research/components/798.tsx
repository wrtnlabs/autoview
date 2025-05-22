import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * An SSH key granting access to a single repository.
   *
   * @title Deploy Key
   */
  export type deploy_key = {
    id: number & tags.Type<"int32">;
    key: string;
    url: string;
    title: string;
    verified: boolean;
    created_at: string;
    read_only: boolean;
    added_by?: string | null;
    last_used?: string | null;
    enabled?: boolean;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.deploy_key;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const maskedKey =
    value.key.length > 40
      ? `${value.key.slice(0, 20)}…${value.key.slice(-15)}`
      : value.key;
  const createdAt = new Date(value.created_at).toLocaleString();
  const lastUsed = value.last_used
    ? new Date(value.last_used).toLocaleString()
    : "Never";
  const urlHost = (() => {
    try {
      return new URL(value.url).host;
    } catch {
      return value.url;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
      {/* Title */}
      <div className="flex items-center gap-2">
        <LucideReact.Key size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.title}
        </h2>
      </div>

      {/* Masked Key */}
      <div className="mt-3 flex items-start gap-2 text-sm text-gray-700">
        <LucideReact.Code size={16} className="text-gray-500 mt-[2px]" />
        <pre className="m-0 font-mono break-all">{maskedKey}</pre>
      </div>

      {/* Metadata & Status */}
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <div className="flex items-center text-gray-600">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span className="ml-1">Created: {createdAt}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <LucideReact.Clock size={16} className="text-gray-500" />
          <span className="ml-1">Last used: {lastUsed}</span>
        </div>
        {value.added_by && (
          <div className="flex items-center text-gray-600">
            <LucideReact.User size={16} className="text-gray-500" />
            <span className="ml-1">Added by: {value.added_by}</span>
          </div>
        )}
        <div className="flex items-center">
          {value.verified ? (
            <>
              <LucideReact.CheckCircle size={16} className="text-green-500" />
              <span className="ml-1 text-green-600">Verified</span>
            </>
          ) : (
            <>
              <LucideReact.AlertTriangle size={16} className="text-amber-500" />
              <span className="ml-1 text-amber-600">Unverified</span>
            </>
          )}
        </div>
        <div className="flex items-center">
          {value.enabled !== false ? (
            <>
              <LucideReact.CheckCircle size={16} className="text-green-500" />
              <span className="ml-1 text-green-600">Enabled</span>
            </>
          ) : (
            <>
              <LucideReact.XCircle size={16} className="text-red-500" />
              <span className="ml-1 text-red-600">Disabled</span>
            </>
          )}
        </div>
        <div className="flex items-center">
          {value.read_only ? (
            <>
              <LucideReact.Lock size={16} className="text-gray-500" />
              <span className="ml-1 text-gray-600">Read-only</span>
            </>
          ) : (
            <>
              <LucideReact.Unlock size={16} className="text-green-500" />
              <span className="ml-1 text-green-600">Read/Write</span>
            </>
          )}
        </div>
        <div className="flex items-center text-gray-600">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="ml-1 break-all">{urlHost}</span>
        </div>
      </div>
    </div>
  );
}
