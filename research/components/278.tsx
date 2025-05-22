import * as LucideReact from "lucide-react";
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
  // 1. Handle missing webhook
  if (!webhook) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No webhook data available.</span>
      </div>
    );
  }

  // 2. Data transformations and derived constants
  const createdDate = webhook.createdAt
    ? new Date(webhook.createdAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "N/A";
  const lastBlockedDate = webhook.lastBlockedAt
    ? new Date(webhook.lastBlockedAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;
  const isActive = !webhook.blocked;
  const statusText = isActive ? "Active" : "Blocked";
  const statusIcon = isActive ? (
    <LucideReact.CheckCircle
      className="text-green-500"
      size={16}
      aria-label="Active"
    />
  ) : (
    <LucideReact.XCircle
      className="text-red-500"
      size={16}
      aria-label="Blocked"
    />
  );
  const formatScope = (s: string) =>
    s
      .split(/[\._]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // 3. Compose visual structure
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full mx-auto">
      {/* Header: Name & Status */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-lg font-semibold text-gray-800 truncate"
          title={webhook.name}
        >
          {webhook.name}
        </h3>
        <div className="flex items-center space-x-1">
          {statusIcon}
          <span className="text-sm text-gray-600">{statusText}</span>
        </div>
      </div>

      {/* Core Details */}
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center">
          <LucideReact.Link
            size={16}
            className="text-gray-400 flex-shrink-0"
            aria-label="Webhook URL"
          />
          <span className="ml-2 truncate" title={webhook.url}>
            {webhook.url}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 flex-shrink-0"
            aria-label="Created At"
          />
          <span className="ml-2">Created: {createdDate}</span>
        </div>
        {lastBlockedDate && (
          <div className="flex items-center">
            <LucideReact.Calendar
              size={16}
              className="text-gray-400 flex-shrink-0"
              aria-label="Last Blocked At"
            />
            <span className="ml-2">Last Blocked: {lastBlockedDate}</span>
          </div>
        )}
        <div className="flex items-center">
          <LucideReact.Code
            size={16}
            className="text-gray-400 flex-shrink-0"
            aria-label="API Version"
          />
          <span className="ml-2">API Version: {webhook.apiVersion}</span>
        </div>
      </div>

      {/* Scopes */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-800 mb-1">Scopes</h4>
        {webhook.scopes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {webhook.scopes.map((scope, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                title={scope}
              >
                {formatScope(scope)}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500 text-sm">No scopes assigned.</span>
        )}
      </div>
    </div>
  );
}
