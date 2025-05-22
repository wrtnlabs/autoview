import { tags } from "typia";
import React from "react";
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
                keywords?: string[] & tags.MinItems<1> & tags.MaxItems<20> & tags.UniqueItems;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4WebhookView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const webhook = value.webhook;
  // Fallback if there's no webhook data
  if (!webhook) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No webhook data available
      </div>
    );
  }

  // Derived and formatted values
  const formattedCreatedAt = webhook.createdAt
    ? new Date(webhook.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown";

  const formattedLastBlockedAt = webhook.lastBlockedAt
    ? new Date(webhook.lastBlockedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const isBlocked = webhook.blocked === true;
  const statusLabel = isBlocked ? "Blocked" : "Active";
  const statusColor = isBlocked
    ? "bg-red-100 text-red-800"
    : "bg-green-100 text-green-800";

  const maskedToken = webhook.token
    ? webhook.token.length > 8
      ? `${webhook.token.slice(0, 4)}...${webhook.token.slice(-4)}`
      : "••••••••"
    : null;

  const keywords = webhook.keywords ?? [];

  // JSX structure with Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {webhook.name}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      <p className="mt-2 text-sm text-blue-600 truncate">{webhook.url}</p>

      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Created:</span>
          <span className="text-gray-600 ml-1">{formattedCreatedAt}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">API Version:</span>
          <span className="text-gray-600 ml-1">{webhook.apiVersion}</span>
        </div>
        {formattedLastBlockedAt && (
          <div className="col-span-2">
            <span className="font-medium text-gray-700">Last Blocked:</span>
            <span className="text-gray-600 ml-1">
              {formattedLastBlockedAt}
            </span>
          </div>
        )}
      </div>

      {keywords.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {keywords.map((kw, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <span className="font-medium text-gray-700">Chats:</span>
          <span className="ml-1 text-gray-600">
            {webhook.watchUserChats ? "On" : "Off"}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700">Groups:</span>
          <span className="ml-1 text-gray-600">
            {webhook.watchGroups ? "On" : "Off"}
          </span>
        </div>
        {maskedToken && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700">Token:</span>
            <span className="ml-1 text-gray-600 font-mono">
              {maskedToken}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
