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
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={48} aria-label="No data" />
        <span className="mt-2">No webhook data available</span>
      </div>
    );
  }

  const createdDate = webhook.createdAt
    ? new Date(webhook.createdAt).toLocaleString()
    : "—";
  const lastBlockedDate = webhook.lastBlockedAt
    ? new Date(webhook.lastBlockedAt).toLocaleString()
    : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Name & Status */}
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={webhook.name}
        >
          {webhook.name}
        </h2>
        {webhook.blocked ? (
          <LucideReact.AlertTriangle
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

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Link size={16} aria-hidden="true" />
          <span className="break-all truncate" title={webhook.url}>
            {webhook.url}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Tag size={16} aria-hidden="true" />
          <span>{webhook.apiVersion}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} aria-hidden="true" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} aria-hidden="true" />
          <span>Last Blocked: {lastBlockedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.MessageCircle size={16} aria-hidden="true" />
          {webhook.watchUserChats ? (
            <div className="flex items-center gap-1">
              <LucideReact.CheckCircle
                size={14}
                className="text-green-500"
                aria-hidden="true"
              />
              <span>Chats</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <LucideReact.XCircle
                size={14}
                className="text-red-500"
                aria-hidden="true"
              />
              <span>Chats</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} aria-hidden="true" />
          {webhook.watchGroups ? (
            <div className="flex items-center gap-1">
              <LucideReact.CheckCircle
                size={14}
                className="text-green-500"
                aria-hidden="true"
              />
              <span>Groups</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <LucideReact.XCircle
                size={14}
                className="text-red-500"
                aria-hidden="true"
              />
              <span>Groups</span>
            </div>
          )}
        </div>
      </div>

      {/* Keywords */}
      {webhook.keywords && webhook.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {webhook.keywords.map((kw) => (
            <span
              key={kw}
              className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
