import { tags } from "typia";
import React from "react";
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
            scopes: ("userChat.opened" | "message.created.userChat" | "message.created.teamChat" | "lead.upserted.contact" | "lead.upserted.subscription" | "lead.deleted" | "member.upserted.contact" | "member.upserted.subscription" | "member.deleted")[] & tags.UniqueItems;
            /**
             * @deprecated
            */
            keywords?: string[] & tags.MinItems<1> & tags.MaxItems<20> & tags.UniqueItems;
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
      <div className="p-4 text-center text-gray-500">
        No webhook data available.
      </div>
    );
  }

  const formattedCreatedAt = webhook.createdAt
    ? new Date(webhook.createdAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '—';

  const formattedLastBlockedAt = webhook.lastBlockedAt
    ? new Date(webhook.lastBlockedAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '';

  const statusLabel = webhook.blocked ? 'Blocked' : 'Active';
  const statusClasses = webhook.blocked
    ? 'text-red-700 bg-red-100'
    : 'text-green-700 bg-green-100';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {webhook.name}
        </h2>
        <p className="mt-1 text-blue-600 text-sm truncate break-all">
          {webhook.url}
        </p>
      </div>

      {/* Details grid */}
      <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="font-medium text-gray-500">Status</dt>
          <dd className={`mt-1 inline-block px-2 py-0.5 text-xs font-medium rounded ${statusClasses}`}>
            {statusLabel}
          </dd>
        </div>

        <div>
          <dt className="font-medium text-gray-500">API Version</dt>
          <dd className="mt-1 text-gray-900">{webhook.apiVersion}</dd>
        </div>

        <div>
          <dt className="font-medium text-gray-500">Created At</dt>
          <dd className="mt-1 text-gray-900">{formattedCreatedAt}</dd>
        </div>

        {webhook.blocked && formattedLastBlockedAt && (
          <div>
            <dt className="font-medium text-gray-500">Last Blocked</dt>
            <dd className="mt-1 text-gray-900">{formattedLastBlockedAt}</dd>
          </div>
        )}
      </dl>

      {/* Scopes */}
      {Array.isArray(webhook.scopes) && webhook.scopes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">Scopes</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {webhook.scopes.map((scope) => (
              <span
                key={scope}
                className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded break-all"
              >
                {scope}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
