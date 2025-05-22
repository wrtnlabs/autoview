import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4WebhooksView = {
                    webhooks?: AutoViewInputSubTypes.legacy.v4.LegacyV4Webhook[];
                    next?: number;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4WebhooksView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const webhooks = value.webhooks ?? [];

  function formatDate(timestamp?: number): string {
    if (!timestamp) return "—";
    const d = new Date(timestamp);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function truncate(text: string, maxLength = 40): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 1) + "…";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {webhooks.length === 0 ? (
        <p className="text-center text-gray-500">No webhooks available.</p>
      ) : (
        <ul className="space-y-4">
          {webhooks.map((hook, idx) => (
            <li
              key={idx}
              className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {hook.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {truncate(hook.url)}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                      hook.blocked
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {hook.blocked ? "Blocked" : "Active"}
                  </span>
                  <span className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                    v{hook.apiVersion}
                  </span>
                  {hook.watchUserChats && (
                    <span className="inline-block px-2 py-0.5 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                      User Chats
                    </span>
                  )}
                  {hook.watchGroups && (
                    <span className="inline-block px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">
                      Groups
                    </span>
                  )}
                  {hook.keywords &&
                    hook.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full"
                      >
                        {kw}
                      </span>
                    ))}
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 text-sm text-gray-600 text-right">
                <p>Channel: {hook.channelId ?? "—"}</p>
                <p>Created: {formatDate(hook.createdAt)}</p>
                {hook.lastBlockedAt != null && (
                  <p>Blocked At: {formatDate(hook.lastBlockedAt)}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {value.next != null && (
        <div className="mt-4 text-center">
          <span className="inline-block px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
            Next Offset: {value.next}
          </span>
        </div>
      )}
    </div>
  );
}
