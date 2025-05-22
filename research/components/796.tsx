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
export type AutoViewInput = AutoViewInputSubTypes.deploy_key[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const maskKey = (key: string): string =>
    key.length > 12 ? `${key.slice(0, 6)}...${key.slice(-4)}` : key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {item.title}
            </h3>
            <div className="mt-1 flex items-center text-sm text-gray-600 space-x-1">
              <LucideReact.Key size={16} className="text-gray-500" />
              <span className="font-mono">{maskKey(item.key)}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={14} />
                <span>Created:</span>
                <time className="ml-1">{formatDate(item.created_at)}</time>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Clock size={14} />
                <span>Last used:</span>
                <time className="ml-1">
                  {item.last_used ? formatDate(item.last_used) : "Never"}
                </time>
              </div>
              <div className="flex items-center space-x-1">
                {item.read_only ? (
                  <>
                    <LucideReact.Lock size={14} className="text-yellow-500" />
                    <span>Read-only</span>
                  </>
                ) : (
                  <>
                    <LucideReact.Unlock size={14} className="text-green-500" />
                    <span>Writable</span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {item.enabled === false ? (
                  <>
                    <LucideReact.XCircle size={14} className="text-red-500" />
                    <span>Disabled</span>
                  </>
                ) : (
                  <>
                    <LucideReact.CheckCircle
                      size={14}
                      className="text-green-500"
                    />
                    <span>Enabled</span>
                  </>
                )}
              </div>
            </div>
            {item.added_by && (
              <div className="mt-3 flex items-center text-sm text-gray-500 space-x-1">
                <LucideReact.User size={14} />
                <span>Added by: {item.added_by}</span>
              </div>
            )}
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
            <div className="flex items-center text-sm text-blue-600 space-x-1 truncate max-w-xs">
              <LucideReact.Link size={16} className="text-gray-500" />
              <span className="truncate">{item.url}</span>
            </div>
          </div>
        </div>
      ))}
      {value.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-sm">No deploy keys available.</p>
        </div>
      )}
    </div>
  );
}
