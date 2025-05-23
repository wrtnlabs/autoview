import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface BotsView {
        next?: number;
        bots?: AutoViewInputSubTypes.bot.CustomBot[];
    }
    export namespace bot {
        export interface CustomBot {
            id?: string;
            channelId?: string;
            name: string;
            description?: string;
            nameDescI18nMap?: {
                [key: string]: AutoViewInputSubTypes.NameDesc;
            };
            createdAt?: number;
            avatar?: AutoViewInputSubTypes.TinyFile;
            color: string & tags.Default<"#123456">;
            avatarUrl?: string;
            ai?: boolean;
        }
    }
    export interface NameDesc {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    }
    export interface TinyFile {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.BotsView;



// The component name is "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants and helper functions
  const bots = value.bots ?? [];
  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Unknown";
  const getPlaceholderAvatar = (name: string): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=0D8ABC&color=fff`;

  // 2. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {bots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot, index) => (
            <div
              key={index}
              className="flex flex-col bg-gray-50 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="w-full aspect-square bg-gray-200">
                <img
                  src={bot.avatarUrl ?? getPlaceholderAvatar(bot.name)}
                  alt={bot.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getPlaceholderAvatar(bot.name);
                  }}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">
                    {bot.name}
                  </h3>
                  <span
                    className="w-3 h-3 ml-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: bot.color }}
                  />
                  {bot.ai && (
                    <LucideReact.Bot
                      className="ml-auto text-blue-500"
                      size={16}
                      aria-label="AI Bot"
                    />
                  )}
                </div>
                {bot.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {bot.description}
                  </p>
                )}
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <LucideReact.Calendar size={14} className="mr-1" />
                  <span>{formatDate(bot.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-500 py-10">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No bots available</span>
        </div>
      )}

      {value.next != null && bots.length > 0 && (
        <div className="mt-4 flex justify-end text-sm text-gray-500">
          <span>Next token: {value.next}</span>
        </div>
      )}
    </div>
  );
}
