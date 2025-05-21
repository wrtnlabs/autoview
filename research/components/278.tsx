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
  const createdDate = webhook?.createdAt
    ? new Date(webhook.createdAt).toLocaleString()
    : "—";
  const lastBlockedDate = webhook?.lastBlockedAt
    ? new Date(webhook.lastBlockedAt).toLocaleString()
    : undefined;
  const isBlocked = webhook?.blocked ?? false;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const content = !webhook ? (
    <div className="p-4 bg-gray-100 text-gray-500 rounded-lg text-sm text-center">
      No webhook data available.
    </div>
  ) : (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {webhook.name}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            isBlocked ? "text-red-700 bg-red-100" : "text-green-700 bg-green-100"
          }`}
        >
          {isBlocked ? "Blocked" : "Active"}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-700 break-all truncate">
        {webhook.url}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Created:</span>
          <span className="ml-1 text-gray-800">{createdDate}</span>
        </div>
        <div>
          <span className="font-medium">API Version:</span>
          <span className="ml-1 text-gray-800">{webhook.apiVersion}</span>
        </div>
        {isBlocked && lastBlockedDate && (
          <div className="col-span-2">
            <span className="font-medium">Last Blocked:</span>
            <span className="ml-1 text-gray-800">{lastBlockedDate}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <span className="font-medium text-gray-600">Scopes:</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {webhook.scopes.map((scope) => (
            <span
              key={scope}
              className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-full"
            >
              {scope}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  // 3. Return the React element.
  return content;
}
