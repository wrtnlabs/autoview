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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const webhook = value.webhook;
  if (!webhook) {
    return (
      <div className="p-4 bg-gray-100 text-gray-600 rounded-lg text-center">
        No webhook information available
      </div>
    );
  }

  const {
    name,
    url,
    apiVersion,
    createdAt,
    lastBlockedAt,
    blocked,
    keywords,
    watchUserChats,
    watchGroups,
  } = webhook;

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString()
    : '—';
  const formattedLastBlockedAt = lastBlockedAt
    ? new Date(lastBlockedAt).toLocaleString()
    : '—';

  const statusText = blocked ? 'Blocked' : 'Active';
  const statusClasses = blocked
    ? 'bg-red-100 text-red-800'
    : 'bg-green-100 text-green-800';

  const watchFeatures: string[] = [];
  if (watchUserChats) watchFeatures.push('User Chats');
  if (watchGroups) watchFeatures.push('Groups');

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-medium text-gray-900 truncate">{name}</h2>
        <span className={`px-2 py-1 text-xs font-semibold rounded ${statusClasses}`}>
          {statusText}
        </span>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">URL:</span>
        </p>
        <p className="mt-1 text-xs font-mono text-blue-600 break-all">
          {url}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-700">
        <div>
          <span className="font-semibold">API Version:</span>
          <span className="ml-1">{apiVersion}</span>
        </div>
        <div>
          <span className="font-semibold">Created:</span>
          <span className="ml-1 text-gray-500">{formattedCreatedAt}</span>
        </div>
        {blocked && lastBlockedAt && (
          <div>
            <span className="font-semibold">Blocked At:</span>
            <span className="ml-1 text-gray-500">{formattedLastBlockedAt}</span>
          </div>
        )}
      </div>

      {watchFeatures.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {watchFeatures.map((feat) => (
            <span
              key={feat}
              className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded"
            >
              {feat}
            </span>
          ))}
        </div>
      )}

      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
            >
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
