import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4WebhookView {
                    webhook?: AutoViewInputSubTypes.legacy.v4.LegacyV4Webhook;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Webhook {
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
            }
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
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-gray-400">
        <LucideReact.AlertCircle size={48} aria-label="No Data" />
        <p className="mt-2 text-sm">No webhook configured</p>
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
    watchUserChats,
    watchGroups,
    keywords,
  } = webhook;

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : undefined;

  const formattedBlockedAt = lastBlockedAt
    ? new Date(lastBlockedAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : undefined;

  const keywordList = Array.isArray(keywords) ? keywords : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        {blocked ? (
          <LucideReact.AlertTriangle
            className="text-red-500"
            size={20}
            aria-label="Blocked"
          />
        ) : (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={20}
            aria-label="Active"
          />
        )}
      </div>

      {/* URL */}
      <div className="mt-3 flex items-start text-gray-600">
        <LucideReact.Link
          className="mt-1 mr-1 text-gray-400"
          size={16}
          aria-label="Webhook URL"
        />
        <span className="break-all text-blue-600 text-sm">{url}</span>
      </div>

      {/* Details Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
        {/* API Version */}
        <div className="flex items-center">
          <LucideReact.Code
            className="mr-1 text-gray-400"
            size={16}
            aria-label="API Version"
          />
          <span>v{apiVersion}</span>
        </div>

        {/* Created At */}
        {formattedCreatedAt && (
          <div className="flex items-center">
            <LucideReact.Calendar
              className="mr-1 text-gray-400"
              size={16}
              aria-label="Created At"
            />
            <span>{formattedCreatedAt}</span>
          </div>
        )}

        {/* Watch User Chats */}
        <div className="flex items-center">
          {watchUserChats ? (
            <LucideReact.CheckCircle
              className="mr-1 text-green-500"
              size={16}
              aria-label="Watching User Chats"
            />
          ) : (
            <LucideReact.XCircle
              className="mr-1 text-red-500"
              size={16}
              aria-label="Not Watching User Chats"
            />
          )}
          <span>Watch User Chats</span>
        </div>

        {/* Watch Groups */}
        <div className="flex items-center">
          {watchGroups ? (
            <LucideReact.CheckCircle
              className="mr-1 text-green-500"
              size={16}
              aria-label="Watching Groups"
            />
          ) : (
            <LucideReact.XCircle
              className="mr-1 text-red-500"
              size={16}
              aria-label="Not Watching Groups"
            />
          )}
          <span>Watch Groups</span>
        </div>

        {/* Blocked At */}
        {blocked && formattedBlockedAt && (
          <div className="sm:col-span-2 flex items-center text-red-600">
            <LucideReact.AlertTriangle
              className="mr-1 text-red-500"
              size={16}
              aria-label="Blocked At"
            />
            <span>Blocked at {formattedBlockedAt}</span>
          </div>
        )}
      </div>

      {/* Keywords */}
      {keywordList.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Keywords</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {keywordList.map((kw, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full truncate"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
