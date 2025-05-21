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
      <div className="p-4 bg-white rounded-lg shadow-md text-gray-500 text-center">
        No webhook data available.
      </div>
    );
  }

  const {
    name,
    url,
    apiVersion,
    createdAt,
    lastBlockedAt,
    watchUserChats,
    watchGroups,
    blocked,
    keywords,
  } = webhook;

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString("default", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const formattedLastBlockedAt = lastBlockedAt
    ? new Date(lastBlockedAt).toLocaleString("default", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        <p className="mt-1 text-sm text-gray-500 truncate">{url}</p>
      </div>

      {/* Status & Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            blocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          {blocked ? "Blocked" : "Active"}
        </span>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            watchUserChats ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
          }`}
        >
          {watchUserChats ? "Watching Chats" : "Not Watching Chats"}
        </span>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            watchGroups ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
          }`}
        >
          {watchGroups ? "Watching Groups" : "Not Watching Groups"}
        </span>
        <span className="px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800">
          API {apiVersion}
        </span>
      </div>

      {/* Details List */}
      <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-600">
        <div className="flex">
          <dt className="w-24 font-medium">Created</dt>
          <dd className="flex-1">{formattedCreatedAt}</dd>
        </div>
        {formattedLastBlockedAt && (
          <div className="flex">
            <dt className="w-24 font-medium">Last Blocked</dt>
            <dd className="flex-1">{formattedLastBlockedAt}</dd>
          </div>
        )}
        {keywords && keywords.length > 0 && (
          <div className="flex">
            <dt className="w-24 font-medium">Keywords</dt>
            <dd className="flex flex-wrap gap-1 flex-1">
              {keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded"
                >
                  {kw}
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
