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
  const formattedDate = (ts?: number) =>
    ts ? new Date(ts).toLocaleString() : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!webhook) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2 text-sm">No webhook data available</span>
      </div>
    );
  }

  const {
    name,
    url,
    apiVersion,
    keywords,
    createdAt,
    watchUserChats,
    watchGroups,
    blocked,
    lastBlockedAt,
  } = webhook;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LucideReact.Rss size={20} className="text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h2>
        </div>
        {blocked ? (
          <LucideReact.ShieldOff
            size={18}
            className="text-red-500"
            aria-label="Blocked"
          />
        ) : (
          <LucideReact.ShieldCheck
            size={18}
            className="text-green-500"
            aria-label="Active"
          />
        )}
      </div>

      {/* Details */}
      <div className="mt-4 space-y-3 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="ml-2 break-all truncate">{url}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Tag size={16} className="text-gray-400" />
          <span className="ml-2">{apiVersion}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-2">{formattedDate(createdAt)}</span>
        </div>

        {keywords && keywords.length > 0 && (
          <div className="flex items-start">
            <LucideReact.Hash size={16} className="text-gray-400 mt-1" />
            <div className="ml-2 flex flex-wrap gap-1">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center">
            <LucideReact.MessageCircle size={16} className="text-gray-400" />
            <span className="ml-2">
              {watchUserChats
                ? "Watching User Chats"
                : "Not Watching User Chats"}
            </span>
          </div>
          <div className="flex items-center">
            <LucideReact.Users size={16} className="text-gray-400" />
            <span className="ml-2">
              {watchGroups ? "Watching Groups" : "Not Watching Groups"}
            </span>
          </div>
        </div>

        {blocked && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span className="ml-2">
              Last Blocked: {formattedDate(lastBlockedAt)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
