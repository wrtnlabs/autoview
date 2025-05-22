import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
        keywords?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<20> &
          tags.UniqueItems;
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
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4WebhooksView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const webhooks = value.webhooks ?? [];
  const formatDate = (timestamp?: number): string =>
    timestamp ? new Date(timestamp).toLocaleString() : "—";

  if (webhooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No webhooks configured</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {webhooks.map((wh, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <LucideReact.Link2 size={20} />
                {wh.name}
              </h3>
              {wh.blocked && (
                <div className="flex items-center text-red-500 text-sm">
                  <LucideReact.AlertTriangle size={16} />
                  <span className="ml-1">Blocked</span>
                </div>
              )}
            </div>
            <div className="space-y-1 text-gray-600 text-sm">
              <div className="flex items-center gap-1 truncate">
                <LucideReact.Link size={16} />
                <span className="truncate">{wh.url}</span>
              </div>
              {wh.channelId && (
                <div className="flex items-center gap-1">
                  <LucideReact.Hash size={16} />
                  <span>{wh.channelId}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>Created: {formatDate(wh.createdAt)}</span>
              </div>
              {wh.blocked && wh.lastBlockedAt && (
                <div className="flex items-center gap-1 text-red-500">
                  <LucideReact.AlertTriangle size={16} />
                  <span>Last blocked: {formatDate(wh.lastBlockedAt)}</span>
                </div>
              )}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-sm">
                  <LucideReact.UserCheck
                    size={16}
                    className={
                      wh.watchUserChats ? "text-green-500" : "text-gray-300"
                    }
                  />
                  <span className="text-gray-600">Users</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <LucideReact.Users
                    size={16}
                    className={
                      wh.watchGroups ? "text-green-500" : "text-gray-300"
                    }
                  />
                  <span className="text-gray-600">Groups</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-500">
                  API v{wh.apiVersion}
                </span>
              </div>
              {wh.keywords && wh.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {wh.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {value.next !== undefined && (
        <div className="text-right text-sm text-gray-500">
          Next token: {value.next}
        </div>
      )}
    </div>
  );
}
