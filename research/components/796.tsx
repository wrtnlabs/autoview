import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * An SSH key granting access to a single repository.
     *
     * @title Deploy Key
    */
    export interface deploy_key {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.deploy_key[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };

  const maskKey = (key: string) => {
    if (key.length <= 30) return key;
    return `${key.slice(0, 15)}...${key.slice(-15)}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No deploy keys available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {value.map((item: AutoViewInputSubTypes.deploy_key) => {
        const created = formatDate(item.created_at);
        const lastUsed = item.last_used ? formatDate(item.last_used) : "Never used";
        const isEnabled = item.enabled !== false;
        return (
          <div
            key={item.id}
            className="flex flex-col p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <LucideReact.Key size={20} className="text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                {item.verified ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                    aria-label="Verified"
                  />
                ) : (
                  <LucideReact.XCircle
                    size={16}
                    className="text-red-500"
                    aria-label="Not Verified"
                  />
                )}
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2 truncate">
              <span className="font-medium">Key:</span> {maskKey(item.key)}
            </div>
            <div className="flex flex-wrap text-sm text-gray-500 gap-3 mb-3">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>Created: {created}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Clock size={16} />
                <span>Last used: {lastUsed}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {item.read_only ? (
                  <LucideReact.Lock
                    size={16}
                    className="text-gray-500"
                    aria-label="Read-only"
                  />
                ) : (
                  <LucideReact.Unlock
                    size={16}
                    className="text-gray-500"
                    aria-label="Read & Write"
                  />
                )}
                <span className="text-gray-700">
                  {item.read_only ? "Read-only" : "Read & Write"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isEnabled ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                    aria-label="Enabled"
                  />
                ) : (
                  <LucideReact.XCircle
                    size={16}
                    className="text-red-500"
                    aria-label="Disabled"
                  />
                )}
                <span className="text-gray-700">
                  {isEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
            {item.added_by && (
              <div className="mt-3 text-sm text-gray-500 flex items-center gap-1">
                <LucideReact.User size={16} />
                <span>Added by: {item.added_by}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
