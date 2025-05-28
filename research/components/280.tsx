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
  const createdDate = webhook?.createdAt
    ? new Date(webhook.createdAt).toLocaleString()
    : "—";
  const isBlocked = webhook?.blocked ?? false;
  const blockedDate = webhook?.lastBlockedAt
    ? new Date(webhook.lastBlockedAt).toLocaleString()
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!webhook) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <p className="text-sm">No webhook data available</p>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {webhook.name}
        </h2>
        {isBlocked ? (
          <div className="flex items-center text-red-500">
            <LucideReact.XCircle
              size={20}
              className="mr-1"
              aria-label="Blocked"
            />
            <span className="text-sm">Blocked</span>
          </div>
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
          <LucideReact.Link size={16} className="text-gray-400 mr-2" />
          <a
            href={webhook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-blue-600 hover:underline"
          >
            {webhook.url}
          </a>
        </div>

        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400 mr-2" />
          <span>Created: {createdDate}</span>
        </div>

        {isBlocked && blockedDate && (
          <div className="flex items-center text-red-600">
            <LucideReact.AlertTriangle size={16} className="mr-1" />
            <span>Last blocked: {blockedDate}</span>
          </div>
        )}

        <div className="flex items-center">
          <span className="font-medium mr-1">API Version:</span>
          <code className="bg-gray-100 px-1 rounded">{webhook.apiVersion}</code>
        </div>

        <div>
          <span className="font-medium">Scopes:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {webhook.scopes.map((scope) => (
              <span
                key={scope}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
              >
                {scope}
              </span>
            ))}
          </div>
        </div>

        {webhook.keywords && webhook.keywords.length > 0 && (
          <div>
            <span className="font-medium">Keywords:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {webhook.keywords.map((kw) => (
                <span
                  key={kw}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
