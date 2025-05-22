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
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No webhook data available.
      </div>
    );
  }

  const {
    name,
    url,
    createdAt,
    apiVersion,
    scopes,
    blocked,
    lastBlockedAt,
  } = webhook;

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString()
    : "—";
  const formattedLastBlocked = lastBlockedAt
    ? new Date(lastBlockedAt).toLocaleString()
    : null;

  const statusLabel = blocked ? "Blocked" : "Active";
  const statusClasses = blocked
    ? "bg-red-100 text-red-800"
    : "bg-green-100 text-green-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Name + Status */}
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={name}
        >
          {name}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* URL */}
      <div>
        <p className="text-sm text-blue-600 break-all truncate" title={url}>
          {url}
        </p>
      </div>

      {/* Metadata: Created At & API Version */}
      <div className="text-sm text-gray-600 space-y-1">
        <div>
          <span className="font-medium text-gray-700">Created:</span>{" "}
          {formattedCreatedAt}
        </div>
        <div>
          <span className="font-medium text-gray-700">API Version:</span>{" "}
          {apiVersion}
        </div>
      </div>

      {/* Scopes */}
      {scopes && scopes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Scopes</h3>
          <div className="flex flex-wrap gap-2">
            {scopes.map((scope, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                title={scope}
              >
                {scope}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Last Blocked At (if applicable) */}
      {formattedLastBlocked && (
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Last Blocked:</span>{" "}
          {formattedLastBlocked}
        </div>
      )}
    </div>
  );
}
