import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface WebhooksView {
        next?: number;
        webhooks?: AutoViewInputSubTypes.webhook.Webhook[];
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
export type AutoViewInput = AutoViewInputSubTypes.WebhooksView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const webhooks = value.webhooks ?? [];
  const formatDate = (ms?: number): string =>
    ms ? new Date(ms).toLocaleString() : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (webhooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" aria-hidden="true" />
        <span className="text-sm">No webhooks configured.</span>
      </div>
    );
  }

  return (
    <section aria-label="Webhooks List" className="space-y-4">
      {webhooks.map((wh, idx) => {
        const createdAt = formatDate(wh.createdAt);
        const lastBlockedAt = wh.lastBlockedAt ? formatDate(wh.lastBlockedAt) : null;
        const isBlocked = Boolean(wh.blocked);

        return (
          <article
            key={wh.id ?? idx}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <header className="flex items-center justify-between mb-2">
              <h2
                className="text-lg font-semibold text-gray-800 truncate"
                title={wh.name}
              >
                {wh.name}
              </h2>
              {isBlocked ? (
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
              )}
            </header>

            <div className="text-sm text-gray-600 mb-2 flex items-center space-x-1">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span className="truncate">{wh.url}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Created: {createdAt}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Code size={16} className="text-gray-400" />
                <span>API v{wh.apiVersion}</span>
              </div>
            </div>

            {wh.scopes.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {wh.scopes.map((scope, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                    title={scope}
                  >
                    {scope}
                  </span>
                ))}
              </div>
            )}

            {lastBlockedAt && (
              <div className="text-xs text-gray-500 flex items-center">
                <LucideReact.Clock size={12} className="mr-1 text-gray-400" />
                <span>Last blocked: {lastBlockedAt}</span>
              </div>
            )}
          </article>
        );
      })}

      {value.next != null && (
        <div className="text-right text-sm text-gray-500">
          Next cursor: <span className="font-medium">{value.next}</span>
        </div>
      )}
    </section>
  );
}
