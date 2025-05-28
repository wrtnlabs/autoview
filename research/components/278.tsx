import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface WebhookView {
        webhook?: AutoViewInputSubTypes.webhook.Webhook;
    }
    export namespace webhook {
        export interface Webhook {
            id?: string;
            channelId?: string;
            name: string;
            url: string;
            token?: string;
            createdAt?: number;
            scopes: ("userChat.opened" | "message.created.userChat" | "message.created.teamChat" | "lead.upserted.contact" | "lead.upserted.subscription" | "lead.deleted" | "member.upserted.contact" | "member.upserted.subscription" | "member.deleted")[] & tags.UniqueItems;
            /**
             * @deprecated
            */
            keywords?: string[] & tags.MinItems<1> & tags.MaxItems<20> & tags.UniqueItems;
            apiVersion: string;
            lastBlockedAt?: number;
            blocked?: boolean;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.WebhookView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const webhook = value.webhook;
  // Helper to format scope keys like "userChat.opened" ⇒ "UserChat Opened"
  const formatScope = (s: string) =>
    s
      .split('.')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  // If there's no webhook object, render an empty state
  if (!webhook) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" aria-label="No data" />
        <span className="text-lg">No webhook data available</span>
      </div>
    );
  }
  // Destructure relevant fields
  const { name, url, apiVersion, scopes, createdAt, blocked, lastBlockedAt } = webhook;
  // Format dates
  const formattedCreated = createdAt
    ? new Date(createdAt).toLocaleString()
    : 'Unknown';
  const formattedLastBlocked = lastBlockedAt
    ? new Date(lastBlockedAt).toLocaleString()
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 mx-auto">
      {/* Header: Name + Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        {blocked ? (
          <div className="flex items-center text-red-500" title="Blocked">
            <LucideReact.XCircle size={20} />
          </div>
        ) : (
          <div className="flex items-center text-green-500" title="Active">
            <LucideReact.CheckCircle size={20} />
          </div>
        )}
      </div>

      {/* URL */}
      <div className="mt-3 flex items-center text-gray-600 truncate">
        <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
        <span className="truncate">{url}</span>
      </div>

      {/* API Version */}
      <div className="mt-2 text-sm text-gray-500">
        API Version:&nbsp;
        <span className="font-medium text-gray-700">{apiVersion}</span>
      </div>

      {/* Scopes */}
      <div className="mt-4">
        <div className="text-sm font-medium text-gray-600 mb-1">Event Scopes</div>
        <div className="flex flex-wrap gap-2">
          {scopes.map((scope, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
            >
              {formatScope(scope)}
            </span>
          ))}
        </div>
      </div>

      {/* Timestamps */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1 flex-shrink-0" />
          <span>Created: {formattedCreated}</span>
        </div>
        {formattedLastBlocked && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="mr-1 flex-shrink-0" />
            <span>Last Blocked: {formattedLastBlocked}</span>
          </div>
        )}
      </div>
    </div>
  );
}
