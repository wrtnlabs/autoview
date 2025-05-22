import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type WebhooksView = {
    next?: number;
    webhooks?: AutoViewInputSubTypes.webhook.Webhook[];
  };
  export namespace webhook {
    export type Webhook = {
      id?: string;
      channelId?: string;
      name: string;
      url: string;
      token?: string;
      createdAt?: number;
      scopes: (
        | "userChat.opened"
        | "message.created.userChat"
        | "message.created.teamChat"
        | "lead.upserted.contact"
        | "lead.upserted.subscription"
        | "lead.deleted"
        | "member.upserted.contact"
        | "member.upserted.subscription"
        | "member.deleted"
      )[] &
        tags.UniqueItems;
      /**
       * @deprecated
       */
      keywords?: string[] &
        tags.MinItems<1> &
        tags.MaxItems<20> &
        tags.UniqueItems;
      apiVersion: string;
      lastBlockedAt?: number;
      blocked?: boolean;
    };
  }
}
export type AutoViewInput = AutoViewInputSubTypes.WebhooksView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived data
  const webhooks: AutoViewInputSubTypes.webhook.Webhook[] =
    value.webhooks ?? [];

  // Helper to format timestamps to human-readable dates
  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  // Render the component
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <LucideReact.Rss className="mr-2 text-gray-600" size={20} />
          Webhooks ({webhooks.length})
        </h2>
      </div>
      {webhooks.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2">No webhooks available.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {webhooks.map((wh, idx) => (
            <li
              key={idx}
              className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row sm:justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-md font-medium text-gray-800 flex items-center truncate">
                  <LucideReact.Rss className="mr-2 text-gray-500" size={16} />
                  {wh.name}
                </h3>
                <div className="mt-1 text-sm text-gray-600 flex items-center truncate">
                  <LucideReact.Link className="mr-1 text-gray-400" size={14} />
                  <span className="truncate">{wh.url}</span>
                </div>
                <div className="mt-2 flex flex-wrap text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <LucideReact.Calendar className="mr-1" size={14} />
                    <span>{formatDate(wh.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    {wh.blocked ? (
                      <LucideReact.XCircle
                        className="mr-1 text-red-500"
                        size={14}
                      />
                    ) : (
                      <LucideReact.CheckCircle
                        className="mr-1 text-green-500"
                        size={14}
                      />
                    )}
                    <span className="capitalize">
                      {wh.blocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                  {wh.lastBlockedAt && (
                    <div className="flex items-center">
                      <LucideReact.AlertTriangle
                        className="mr-1 text-amber-500"
                        size={14}
                      />
                      <span>Last blocked: {formatDate(wh.lastBlockedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-6 flex items-center space-x-2">
                <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  {wh.apiVersion}
                </span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {wh.scopes.length} scope{wh.scopes.length !== 1 ? "s" : ""}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {value.next != null && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          More webhooks available (page {value.next})
        </div>
      )}
    </div>
  );
}
