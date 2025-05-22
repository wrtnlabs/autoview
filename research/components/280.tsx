import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type WebhookView = {
    webhook?: AutoViewInputSubTypes.webhook.Webhook;
  };
  export namespace webhook {
    export type Webhook = {
      id?: string;
      channelId?: string;
      name: string;
      url: string;
      token?: string;
      createdAt?: number;
      scopes: (
        | "userChat.opened"
        | "message.created.userChat"
        | "message.created.teamChat"
        | "lead.upserted.contact"
        | "lead.upserted.subscription"
        | "lead.deleted"
        | "member.upserted.contact"
        | "member.upserted.subscription"
        | "member.deleted"
      )[] &
        tags.UniqueItems;
      /**
       * @deprecated
       */
      keywords?: string[] &
        tags.MinItems<1> &
        tags.MaxItems<20> &
        tags.UniqueItems;
      apiVersion: string;
      lastBlockedAt?: number;
      blocked?: boolean;
    };
  }
}
export type AutoViewInput = AutoViewInputSubTypes.WebhookView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const webhook = value.webhook;

  // 1. Early return if no webhook data
  if (!webhook) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md text-gray-500">
        <LucideReact.AlertCircle
          size={48}
          className="mb-2"
          aria-label="No data"
        />
        <span>No webhook data available</span>
      </div>
    );
  }

  // 2. Derived constants for formatting and status
  const createdDate = webhook.createdAt
    ? new Date(webhook.createdAt).toLocaleString()
    : "Unknown";
  const lastBlockedDate = webhook.lastBlockedAt
    ? new Date(webhook.lastBlockedAt).toLocaleString()
    : null;
  const isBlocked = webhook.blocked === true;
  const statusIcon = isBlocked ? (
    <LucideReact.XCircle
      size={16}
      className="text-red-500 ml-2"
      aria-label="Blocked"
    />
  ) : (
    <LucideReact.CheckCircle
      size={16}
      className="text-green-500 ml-2"
      aria-label="Active"
    />
  );
  const statusText = isBlocked ? "Blocked" : "Active";
  const uniqueScopes = Array.from(new Set(webhook.scopes));

  // 3. JSX structure
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {webhook.name}
        </h2>
        <div className="flex items-center text-sm text-gray-600">
          <span>Status:</span>
          {statusIcon}
        </div>
      </header>

      <div className="flex items-center text-gray-700 text-sm truncate">
        <LucideReact.Link
          size={16}
          className="text-gray-400 mr-1"
          aria-label="URL"
        />
        <span title={webhook.url}>{webhook.url}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {uniqueScopes.map((scope) => (
          <span
            key={scope}
            className="bg-blue-50 text-blue-600 text-xs uppercase font-medium px-2 py-0.5 rounded"
          >
            {scope}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
        <div className="flex items-center">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 mr-1"
            aria-label="Created at"
          />
          <span title={createdDate}>{createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Code
            size={16}
            className="text-gray-400 mr-1"
            aria-label="API Version"
          />
          <span>{webhook.apiVersion}</span>
        </div>
        {lastBlockedDate && (
          <div className="flex items-center col-span-2">
            <LucideReact.AlertTriangle
              size={16}
              className="text-gray-400 mr-1"
              aria-label="Last blocked at"
            />
            <span title={lastBlockedDate}>{lastBlockedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
