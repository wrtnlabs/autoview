import * as LucideReact from "lucide-react";
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
  if (!webhook) {
    return (
      <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
        <LucideReact.AlertCircle className="text-gray-400" size={24} />
        <span className="mt-2 text-gray-500 text-sm">
          No webhook data available
        </span>
      </div>
    );
  }

  const createdAt = webhook.createdAt
    ? new Date(webhook.createdAt).toLocaleString()
    : "Unknown";
  const lastBlockedAt = webhook.lastBlockedAt
    ? new Date(webhook.lastBlockedAt).toLocaleString()
    : null;
  const isBlocked = Boolean(webhook.blocked);
  const status = isBlocked ? "Blocked" : "Active";
  const statusIcon = isBlocked ? (
    <LucideReact.XCircle
      className="text-red-500"
      size={16}
      aria-label="Blocked"
    />
  ) : (
    <LucideReact.CheckCircle
      className="text-green-500"
      size={16}
      aria-label="Active"
    />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Name & Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {webhook.name}
        </h2>
        <div className="flex items-center gap-1">
          {statusIcon}
          <span
            className={`text-sm ${
              isBlocked ? "text-red-600" : "text-green-600"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* URL */}
      <div className="flex items-start text-gray-600 text-sm break-all">
        <LucideReact.Link className="mt-1 mr-1 flex-shrink-0" size={16} />
        <span>{webhook.url}</span>
      </div>

      {/* API Version */}
      <div className="text-gray-700 text-sm">
        <span className="font-medium">API Version:</span>{" "}
        <span className="font-mono">{webhook.apiVersion}</span>
      </div>

      {/* Created At */}
      <div className="flex items-center text-gray-600 text-sm">
        <LucideReact.Calendar className="mr-1" size={16} />
        <span>Created: {createdAt}</span>
      </div>

      {/* Last Blocked At (if present) */}
      {lastBlockedAt && (
        <div className="flex items-center text-gray-600 text-sm">
          <LucideReact.AlertTriangle
            className="mr-1 text-yellow-500"
            size={16}
          />
          <span>Last Blocked: {lastBlockedAt}</span>
        </div>
      )}

      {/* Keywords */}
      {webhook.keywords && webhook.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {webhook.keywords.map((kw, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full truncate"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* Subscriptions */}
      <div className="flex items-center gap-4">
        {webhook.watchUserChats && (
          <div className="flex items-center text-gray-600 text-sm">
            <LucideReact.MessageSquare className="mr-1" size={16} />
            <span>Watching Chats</span>
          </div>
        )}
        {webhook.watchGroups && (
          <div className="flex items-center text-gray-600 text-sm">
            <LucideReact.Users className="mr-1" size={16} />
            <span>Watching Groups</span>
          </div>
        )}
      </div>
    </div>
  );
}
