import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.WebhooksView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const webhooks = value.webhooks ?? [];
  const count = webhooks.length;

  const formatDate = (ts?: number): string =>
    ts
      ? new Date(ts).toLocaleString("default", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Webhooks ({count})
        </h2>
        {value.next !== undefined && (
          <span className="text-sm text-gray-500">
            Next page token: {value.next}
          </span>
        )}
      </div>

      {count === 0 ? (
        <p className="text-center text-gray-500">No webhooks configured.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {webhooks.map((hook, idx) => {
            const isBlocked = hook.blocked === true;
            return (
              <div
                key={hook.id ?? idx}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {hook.name}
                  </h3>
                  <span
                    className={`ml-2 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                      isBlocked
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-600 truncate">
                  {hook.url}
                </p>

                <div className="mt-3 flex flex-wrap">
                  {hook.scopes.map((scope, sidx) => (
                    <span
                      key={sidx}
                      className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded mr-1 mb-1"
                    >
                      {scope}
                    </span>
                  ))}
                </div>

                <dl className="mt-4 text-sm text-gray-700 space-y-1">
                  <div className="flex justify-between">
                    <dt className="font-medium">API Version:</dt>
                    <dd>{hook.apiVersion}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Created:</dt>
                    <dd>{formatDate(hook.createdAt)}</dd>
                  </div>
                  {isBlocked && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Blocked At:</dt>
                      <dd>{formatDate(hook.lastBlockedAt)}</dd>
                    </div>
                  )}
                </dl>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
