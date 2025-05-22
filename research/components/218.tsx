import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4WebhookView = {
          webhook?: AutoViewInputSubTypes.legacy.v4.LegacyV4Webhook;
        };
      }
    }
    export namespace v4 {
      export type LegacyV4Webhook = {
        id?: string;
        channelId?: string;
        name: string;
        url: string;
        token?: string;
        keywords?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<20> &
          tags.UniqueItems;
        createdAt?: number;
        watchUserChats?: boolean;
        watchGroups?: boolean;
        apiVersion: string;
        lastBlockedAt?: number;
        blocked?: boolean;
      };
    }
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4WebhookView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const webhook = value.webhook;
  // Fallback when no webhook data:
  if (!webhook) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span>No webhook data available</span>
      </div>
    );
  }

  const {
    name,
    url,
    apiVersion,
    createdAt,
    lastBlockedAt,
    blocked = false,
    watchUserChats = false,
    watchGroups = false,
    keywords,
  } = webhook;

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const formattedLastBlockedAt = lastBlockedAt
    ? new Date(lastBlockedAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Name and Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        {blocked ? (
          <div className="flex items-center text-red-600">
            <LucideReact.AlertTriangle size={16} className="mr-1" />
            <span className="font-medium">Blocked</span>
          </div>
        ) : (
          <div className="flex items-center text-green-600">
            <LucideReact.CheckCircle size={16} className="mr-1" />
            <span className="font-medium">Active</span>
          </div>
        )}
      </div>

      {/* Core Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
        <div className="flex items-center overflow-hidden">
          <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
          <span className="truncate">{url}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Code size={16} className="mr-1" />
          <span>API v{apiVersion}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Created: {formattedCreatedAt}</span>
        </div>
        {formattedLastBlockedAt && (
          <div className="flex items-center">
            <LucideReact.Clock size={16} className="mr-1" />
            <span>Last blocked: {formattedLastBlockedAt}</span>
          </div>
        )}
      </div>

      {/* Watch Settings */}
      {(watchUserChats || watchGroups) && (
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {watchUserChats && (
            <div className="flex items-center">
              <LucideReact.MessageSquare size={16} className="mr-1" />
              <span>Watching Chats</span>
            </div>
          )}
          {watchGroups && (
            <div className="flex items-center">
              <LucideReact.Users size={16} className="mr-1" />
              <span>Watching Groups</span>
            </div>
          )}
        </div>
      )}

      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
