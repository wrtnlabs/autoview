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
  const wk = value.webhook;
  const hasWebhook = Boolean(wk);
  const name = wk?.name ?? "";
  const url = wk?.url ?? "";
  const apiVersion = wk?.apiVersion ?? "";
  const keywords = wk?.keywords ?? [];
  const createdAt = wk?.createdAt;
  const lastBlockedAt = wk?.lastBlockedAt;
  const watchUserChats = wk?.watchUserChats ?? false;
  const watchGroups = wk?.watchGroups ?? false;
  const blocked = wk?.blocked ?? false;

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString()
    : undefined;
  const formattedLastBlockedAt = lastBlockedAt
    ? new Date(lastBlockedAt).toLocaleString()
    : undefined;

  // Icons and status
  const statusIcon = blocked ? (
    <LucideReact.AlertTriangle
      size={16}
      className="text-red-500"
      aria-label="Blocked"
    />
  ) : (
    <LucideReact.CheckCircle
      size={16}
      className="text-green-500"
      aria-label="Active"
    />
  );
  const statusText = blocked ? "Blocked" : "Active";

  const chatIcon = (
    <LucideReact.MessageSquare
      size={16}
      className={watchUserChats ? "text-green-500" : "text-gray-400"}
      aria-label={
        watchUserChats ? "Watching user chats" : "Not watching user chats"
      }
    />
  );
  const groupIcon = (
    <LucideReact.Users
      size={16}
      className={watchGroups ? "text-green-500" : "text-gray-400"}
      aria-label={watchGroups ? "Watching groups" : "Not watching groups"}
    />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasWebhook) {
    return (
      <div className="p-4 bg-white rounded-lg shadow text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
        <p>No webhook configured.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto space-y-4">
      {/* Header: Name */}
      <div className="flex items-center space-x-2">
        <LucideReact.Rss size={20} className="text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
      </div>

      {/* URL & API Version */}
      <div className="space-y-1">
        <div className="flex items-center text-blue-600 overflow-hidden">
          <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{url}</span>
        </div>
        <div className="text-sm text-gray-500">API Version: {apiVersion}</div>
      </div>

      {/* Status */}
      <div className="flex items-center space-x-1 text-sm">
        <span>Status:</span>
        <span className="flex items-center space-x-1">
          {statusIcon}
          <span className={blocked ? "text-red-600" : "text-green-600"}>
            {statusText}
          </span>
        </span>
      </div>
      {blocked && formattedLastBlockedAt && (
        <div className="text-xs text-red-500">
          Last blocked: {formattedLastBlockedAt}
        </div>
      )}

      {/* Creation Date */}
      {formattedCreatedAt && (
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1 flex-shrink-0" />
          <span>Created: {formattedCreatedAt}</span>
        </div>
      )}

      {/* Watch Settings */}
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-1">
          {chatIcon}
          <span className={watchUserChats ? "text-gray-800" : "text-gray-400"}>
            User Chats
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {groupIcon}
          <span className={watchGroups ? "text-gray-800" : "text-gray-400"}>
            Groups
          </span>
        </div>
      </div>

      {/* Keywords */}
      {keywords.length > 0 && (
        <div className="mt-2">
          <span className="text-sm font-medium text-gray-700">Keywords:</span>
          <div className="mt-1 flex flex-wrap">
            {keywords.map((kw, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded mr-1 mb-1"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
