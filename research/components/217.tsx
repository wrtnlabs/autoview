import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4WebhooksView {
                    webhooks?: AutoViewInputSubTypes.legacy.v4.LegacyV4Webhook[];
                    next?: number;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4WebhooksView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived data
  const webhooks = value.webhooks ?? [];
  const hasWebhooks = webhooks.length > 0;
  const formatDate = (timestamp?: number): string =>
    timestamp ? new Date(timestamp).toLocaleString() : "—";

  // Render
  return (
    <div className="space-y-4">
      {hasWebhooks ? (
        webhooks.map((wh, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:items-start sm:justify-between"
          >
            {/* Main Info */}
            <div className="flex-1">
              <div className="text-lg font-semibold text-gray-800 truncate">
                {wh.name}
              </div>
              <div className="mt-1 flex items-center text-gray-600 text-sm space-x-2">
                <LucideReact.Link
                  size={16}
                  className="text-gray-400"
                  aria-label="Webhook URL"
                />
                <a
                  href={wh.url}
                  title={wh.url}
                  className="truncate hover:underline"
                >
                  {wh.url}
                </a>
              </div>
              <div className="mt-2 flex flex-wrap items-center text-gray-500 text-sm gap-4">
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar
                    size={14}
                    className="text-gray-400"
                    aria-label="Created at"
                  />
                  <span>{formatDate(wh.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {wh.blocked ? (
                    <>
                      <LucideReact.AlertTriangle
                        size={14}
                        className="text-red-500"
                        aria-label="Blocked"
                      />
                      <span>Blocked</span>
                    </>
                  ) : (
                    <>
                      <LucideReact.CheckCircle
                        size={14}
                        className="text-green-500"
                        aria-label="Active"
                      />
                      <span>Active</span>
                    </>
                  )}
                </div>
              </div>
              {wh.keywords && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {wh.keywords.map((kw, kidx) => (
                    <span
                      key={kidx}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-4 text-gray-600 text-sm">
              {wh.watchUserChats != null && (
                <div className="flex items-center space-x-1">
                  <LucideReact.MessageSquare
                    size={16}
                    className="text-gray-400"
                    aria-label="User chats"
                  />
                  <span>
                    {wh.watchUserChats ? "Watching Chats" : "Chats Off"}
                  </span>
                </div>
              )}
              {wh.watchGroups != null && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Users
                    size={16}
                    className="text-gray-400"
                    aria-label="Groups"
                  />
                  <span>{wh.watchGroups ? "Watching Groups" : "Groups Off"}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <LucideReact.Code
                  size={16}
                  className="text-gray-400"
                  aria-label="API Version"
                />
                <span>{wh.apiVersion}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-gray-400">
          <LucideReact.AlertCircle size={48} aria-label="No data" />
          <span className="mt-4 text-sm">No webhooks configured</span>
        </div>
      )}
    </div>
  );
}
