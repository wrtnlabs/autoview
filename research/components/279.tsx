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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const webhook = value.webhook;
  if (!webhook) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg flex items-center">
        <LucideReact.AlertCircle className="text-gray-400 mr-2" size={24} />
        <span className="text-gray-500">No webhook data available.</span>
      </div>
    );
  }

  const { name, url, apiVersion, createdAt, lastBlockedAt, blocked, scopes } =
    webhook;

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString()
    : "Unknown";
  const formattedLastBlockedAt = lastBlockedAt
    ? new Date(lastBlockedAt).toLocaleString()
    : null;

  const statusIcon = blocked ? (
    <LucideReact.AlertTriangle className="text-red-500" size={16} />
  ) : (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  );
  const statusText = blocked ? "Blocked" : "Active";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        <div className="flex items-center space-x-1">
          {statusIcon}
          <span
            className={
              blocked
                ? "text-red-600 text-sm font-medium"
                : "text-green-600 text-sm font-medium"
            }
          >
            {statusText}
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center text-gray-600 text-sm">
        <LucideReact.Calendar className="mr-1" size={16} />
        <span>Created: {formattedCreatedAt}</span>
      </div>

      {formattedLastBlockedAt && (
        <div className="mt-1 flex items-center text-gray-600 text-sm">
          <LucideReact.AlertTriangle className="mr-1 text-red-400" size={16} />
          <span>Last blocked: {formattedLastBlockedAt}</span>
        </div>
      )}

      <div className="mt-4 flex items-center text-gray-600 text-sm">
        <LucideReact.Link className="mr-1" size={16} />
        <span className="truncate">{url}</span>
      </div>

      <div className="mt-2 flex items-center text-gray-600 text-sm">
        <LucideReact.Tag className="mr-1" size={16} />
        <span>API Version: {apiVersion}</span>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">Scopes</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {scopes.map((scope) => (
            <span
              key={scope}
              className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs"
            >
              {scope}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
