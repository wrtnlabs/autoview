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
  const createdAt = webhook?.createdAt
    ? new Date(webhook.createdAt).toLocaleString()
    : null;
  const lastBlockedAt = webhook?.lastBlockedAt
    ? new Date(webhook.lastBlockedAt).toLocaleString()
    : null;

  // 3. Return the React element.
  if (!webhook) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No webhook data available</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {webhook.name}
        </h2>
        {webhook.blocked ? (
          <LucideReact.XCircle
            size={20}
            className="text-red-500"
            aria-label="Blocked"
          />
        ) : (
          <LucideReact.CheckCircle
            size={20}
            className="text-green-500"
            aria-label="Active"
          />
        )}
      </div>

      <div className="space-y-3 text-gray-700 text-sm">
        <div className="flex items-center">
          <LucideReact.Link size={16} className="text-gray-400 mr-1" />
          <a
            href={webhook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate hover:underline"
          >
            {webhook.url}
          </a>
        </div>

        <div className="flex items-center">
          <LucideReact.Code size={16} className="text-gray-400 mr-1" />
          <span>API v{webhook.apiVersion}</span>
        </div>

        {createdAt && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
            <span>Created: {createdAt}</span>
          </div>
        )}

        {lastBlockedAt && (
          <div className="flex items-center">
            <LucideReact.AlertTriangle
              size={16}
              className="text-red-400 mr-1"
            />
            <span>Last blocked: {lastBlockedAt}</span>
          </div>
        )}

        <div>
          <span className="font-medium text-gray-800">Scopes:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {webhook.scopes.map((scope) => (
              <span
                key={scope}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-md"
              >
                {scope}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
